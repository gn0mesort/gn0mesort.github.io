---
title: Megatech Assertions
subtitle: ""
subtitleattribution: ""
subtitlework: ""
description: "About the Megatech Assertions library."
summary: "About the Megatech Assertions library."
keywords:
    - c++20
    - c++
    - debugging
    - assertions
    - python
    - project
    - log
date: 2024-10-12T17:07:31-07:00
publishdate: 2024-10-12
toc: true
backrefs: true
highlighter: true
showdates: true
nolist: false
---

## Introduction

Debug assertions are something I go back and forth on. In general, I've always tended towards what others might call
cowboy coding. Lately, I've been trying to move away from that a bit. That means that I've been writing more tests,
and I'd like to leverage assertions more too. Unfortunately for me, <span class="nowrap">C++'s</span> assertion
functionality kind of sucks.

On its own, <span class="nowrap">C++20</span> provides two types of assertions. First, there are compile-time
assertions with `static_assert`. These are mostly fine for what they are. Plus, with concepts a lot of what I'd like
to be able to enforce at compile-time is now enforceable. On the other hand, <span class="nowrap">C++'s</span>
run-time assert macro (that it inherited from C) sucks. It lacks any really useful debugging features and is
confusingly controlled by the `NDEBUG` macro (you disable debugging by enabling no debugging). That's why I've
usually provided my own implementation for run-time assertions.

In the past, when I've provided my own assertion implementation it was just part of the project I was working on.
I didn't want to do that this time around because I'm pretty sure I'd just be reimplementing the same stuff over and
over. I also think it's probably less useful to others. So, here's another little library.

## The Problem

Standard <span class="nowrap">C++</span> run-time assertions provide a very minimal interface. You can check that an
expression is true. If the expression isn't true, the program writes a diagnostic message and calls `std::abort`. If
you need more functionality than that, for example custom diagnostics, you need to resort to hacks like:

```cpp
assert(i < 12 && "If i is out of range you probably passed the wrong value to foo().");
```

It would be better to have an interface that allows developers to provide an explicit message (like `static_assert`
does). It would be even better if that interface allowed for formatted messages, so that they can communicate run-time
context. At least for me, sometimes being able to see the value that triggered a failure saves one or more round-trips
with [GDB](https://sourceware.org/gdb/).

In addition to lacking custom messages, I think the macro that controls standard assertions is confusing. When
`NDEBUG` is enabled (i.e., defined) debugging is disabled. Often, `NDEBUG` will be defined whenever you build a
program in a "release" configuration. It's important to keep this behavior because lots of people expect it. However,
it would be better to have an option to clearly enable or disable assertions regardless of `NDEBUG`.

Finally, it's critical that assertions work even in cases where you've totally screwed your program. I think, that's
probably why the standard macro is so limited. It can be written in a way that provides, basically, one point of
failure (i.e., writing to standard error). Anything more complex either needs that same property, or it needs to have
all of its fancy features be optional.

Outside the assertion problem itself, there's also the problem of testing any module whose purpose is to abort a
program with an error. Obviously, you can't test programs of that type by checking for whether they exit with an
error. So, these difficulties require some extra infrastructure to solve in a testable way.

## The Solution

My solution is a library that I've called [Megatech Assertions](https://github.com/gn0mesort/megatech-assertions).
Unsurprisingly, the primary interface is a set of function-like macros. Three of these macros
(`MEGATECH_ASSERT`, `MEGATECH_PRECONDITION`, and `MEGATECH_POSTCONDITION`) behave more or less like the standard
assertion macro. There are three more macros that provide access to a formatted message assertion
(`MEGATECH_ASSERT_MSG`, `MEGATECH_PRECONDITION_MSG`, and `MEGATECH_POSTCONDITION_MSG`). These behave like the standard
assertion, but they accept a format string and a variadic set of parameters. The exact type of format string is
dependent on the features available at compile-time. By default, Megatech Assertions prefers the standard format
library. This allows for type-safe formatting. If that isn't available, for whatever reason, the library falls back
to `printf`-style syntax. This is more portable, but requires more care. Since this changing default behavior might be
undesirable, applications can explicitly define which formatter to use at compile-time or leverage a set of explicit
macros for each syntax (`MEGATECH_*_MSG_FORMAT` and `MEGATECH_*_MSG_PRINTF`). The standard format based functionality
is always dependent on its availability at compile-time, so in the case that it isn't available it is always disabled.

Underneath these macros is a pretty simple procedural interface. `megatech::debug_assertion` provides the
implementation for standard-like assertions. Meanwhile, `megatech::debug_assertion_printf` (always available) and
`megatech::debug_assertion_format` (available when standard format is available and enabled) provide the extended
message-based functionality.

Introducing the formatted message functionality creates some room for failures. For example, what should a program do
when a formatter fails? You can't throw an error back to the application after an assertion fails because the program
is definitionally in an undefined state. The way I've handled this is by reporting an error message rather than the
desired developer message. The error messages are compile-time constants and don't require any formatting before
output. Another issue is what happens if the system is out of memory? This is a somewhat unlikely case, but consider
the following scenario:

```cpp
auto p = reinterpret_cast<int*>(std::malloc(size * sizeof(int)));
MEGATECH_ASSERT_MSG(p != nullptr, "Tried to allocate {} ints, but failed.", size);
```

If this assertion fails, it isn't safe to allocate further memory for a formatted message. We have to do something
else. My implementation solves this by using a static buffer for formatted messages. Instead of allocating, the
library truncates messages to the buffer's size. Truncating for the `printf`-style formatter is trivial. It calls
`std::vsnprintf`, which truncates all by itself. The standard format implementation uses `std::vformat_to` instead.
`std::vformat_to` has no idea about buffer lengths, so I had to write a truncating iterator type which discards any
extra output. The build configuration controls the exact buffer size. The default is 4001 bytes (i.e., enough for a
minimum of 1000
[UTF-8 "characters"](https://en.wikipedia.org/wiki/Universal_Character_Set_characters#Characters_vs_code_points) and a
`NUL`-terminator), but it can be reduced or fully disabled. When the build disables the message buffer, formatted
message assertions behave identically to the standard-style assertions.

In terms of enabling and disabling assertions entirely, Megatech Assertions uses two macros. Applications can define
`MEGATECH_ASSERTIONS_DISABLED` to totally disable assertions after that point. The inverse,
`MEGATECH_ASSERTIONS_ENABLED` can be defined explicitly too. It has the obvious effect of enabling assertions. When
an application leaves both macros undefined, `MEGATECH_ASSERTIONS_ENABLED` is conditionally defined based on `NDEBUG`.
Disabled assertions all resolve to `((void) 0)`.

That pretty much covers my problems, but there is another issue that came up while I was working on this library.
What happens if multiple assertions fail, at roughly the same time, in parallel? The answer (at least with
[GNU implementations](https://www.gnu.org/software/libc/)) seems to be that sometimes you get one message, and
sometimes you get multiple. Usually, you don't get more than two. This is mostly a personal choice, but I'd prefer to
see as many messages as I can collect.

To enable more defined behavior in parallel programs, I've added some synchronization to make assertions thread-safe
by default. When this is enabled, it changes a couple of things. First, it makes the message buffer thread-local. The
exact consequences of this are hard for me to estimate, but it definitely expands the memory requirement for
assertions (roughly 4 KiB per thread that fails an assertion rather than roughly 4 KiB for the entire library).
Second, it adds a few synchronization primitives (i.e., `std::mutex` and `std::condition_variable`) to keep assertion
failures on multiple threads from interfering with each other. The result is, as long as parallel failures happen
roughly at the same time, multiple diagnostics will be collected before the program aborts.

Obviously, for some users this a huge over-complication. It introduces more points of failure, expands the memory
cost of the library, and can slow things down. To fix that, I've made the thread-safety feature optional, but it's
enabled by default.

Lastly, to test all of this I've written a small Python script that implements the various test conditions I'm
checking for. Basically, the script looks at standard error and checks for the messages it expects. Then the script
converts the result into an exit code so that [Meson](https://mesonbuild.com/) can report the test result correctly.
It's nothing fancy, but how else are you going to test a feature that requires a program to fail?

## Thoughts

To me, this was a pretty boring little thing. You can probably tell, that I needed to over-complicate it a little
just to keep myself interested. I actually started this because I felt that I should add assertions to a couple of
places in [Megatech-Vulkan Dispatch](https://github.com/gn0mesort/megatech-vulkan-dispatch). I mostly based the
implementation on things that I had written before, but with greater attention to detail this time. For me, the
functionality is satisfactory. I hope that it is useful for others too.

With this project behind me, I'm planning to do quick update to Megatech-Vulkan Dispatch. I probably won't write
about it because it's just a small change. After that, I'm going back to
[my previous plans](/projects/megatech_vulkan_dispatch/#thoughts). Either I'll work on something
[Vulkan](https://vulkan.org) related, or maybe I'll revisit writing a text-mode game.

I'm actually leaning towards a game at the moment. I guess, I'm just fickle in that way. I like to write libraries
like this one because they make me feel like I'm doing something generally useful (at least to all my future selves).
Complete applications, on the other hand make me feel more like a, "real programmer".

Lately, I've been really struggling. I've been looking for work, and it just hasn't gone anywhere yet. The whole
process makes me feel like a total reject. Obviously, getting summarily rejected by some business's HR department or
[ATS](https://en.wikipedia.org/wiki/Applicant_tracking_system) isn't a huge personal indictment. It sure feels that
way to me though. Whatever I do next, I want it to really build me up rather than make me feel like I'm a reject.
That's why I've been thinking about doing a less structured game project. None of the, "only standard
<span class="nowrap">C++</span>," stuff or fixation on rigorous personal expectations I usually bring to my projects.

Regardless, I'm never going to give up. That's just how I am.

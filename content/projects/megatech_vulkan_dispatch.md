---
title: Megatech-Vulkan Dispatch
subtitle: ""
subtitleattribution: ""
subtitlework: ""
description: "About my Vulkan dispatch library and tools."
summary: "About my Vulkan dispatch library and tools."
keywords:
    - vulkan
    - c++20
    - c++
    - dispatch
    - python
    - project
    - log
date: 2024-09-07T16:26:52-07:00
publishdate: 2024-09-09
toc: true
backrefs: true
highlighter: false
showdates: true
nolist: false
---

## Introduction

All the way [back in March](/projects/standard_cxx_tic_tac_toe/), I wrote that I thought a text-mode game would be a
good next step after my little Tic-Tac-Toe project. When it came time to decide on something to work on, I actually
did attempt this. I wanted to write a little [NCURSES](https://invisible-island.net/ncurses/announce.html)
role-playing game. Unfortunately, I quickly lost interest. The big problem was that there simply isn't a reliable why
to retrieve keyboard input from the NCURSES interface. I tried using a different library
([notcurses](https://github.com/dankamongmen/notcurses)) to resolve this, but I was left feeling that my needs just 
didn't map to the capabilities that were actually available.

In the same post where I wrote about wanting to write a text-mode game, I also wrote that I was tempted to go back to
[OpenGL](https://www.khronos.org/opengl/) or [Vulkan](https://www.vulkan.org/). Well, obviously, that's what I ended
up doing. After becoming frustrated with NCURSES, I decided to simply return to a topic I find interesting. I thought
it would be fun to return to writing my own Vulkan API tool-kit.

Previously, when I've attempted this type of project, my eyes have been bigger than my stomach. To help keep
everything grounded in reality, I decided to focus exclusively on Vulkan and start at the most basic level. In my
opinion, the most basic level of Vulkan functionality is just preparing to access the API.

## The Problem

Before a Vulkan program can do anything interesting, it needs to discover function pointers to the commands that it's
going to use. Usually, a program can just link the Vulkan loader library and let the operating system's run-time
linker resolve the core Vulkan commands. Unfortunately, the
[Vulkan specification](https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#initialization-functionpointers)
says this:

> Vulkan commands are not necessarily exposed by static linking on a platform.

This means that, with only one exception, applications might be required to resolve Vulkan commands using
[`vkGetInstanceProcAddr`](https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/vkGetInstanceProcAddr.html).
The singular exception is, of course, `vkGetInstanceProcAddr` itself. On this, the
specification provides some clarification:

> `vkGetInstanceProcAddr` itself is obtained in a platform- and loader- specific manner. Typically, the loader library
> will export this command as a function symbol, so applications **can** link against the loader library, or load it
> dynamically and look up the symbol using platform-specific APIs.

There is actually a second issue though. In addition to the above bits, the Vulkan specification says:

> In order to support systems with multiple Vulkan implementations, the function pointers returned by
> `vkGetInstanceProcAddr` **may** point to dispatch code that calls a different real implementation for different
> [`VkDevice`](https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/VkDevice.html) objects or their child
> objects. The overhead of the internal dispatch for `VkDevice` objects can be avoided by obtaining device-specific
> function pointers for any commands that use a device or device-child object as
> their dispatchable object.

To summarize all of this, a Vulkan application should do two things in the name of portability and performance. First,
it should always resolve Vulkan commands using one of the two available resolvers (i.e., `vkGetInstanceProcAddr` or
[`vkGetDeviceProcAddr`](https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/vkGetDeviceProcAddr.html)).
Any other method of accessing Vulkan is not guaranteed. Second, it should avoid resolving device-level functionality
with `vkGetInstanceProcAddr`. Using `vkGetDeviceProcAddr` is better because it allows the application to avoid
additional dispatch work each time it invokes a device-level command.

So, here's the problem: how does a Vulkan application manage this in a way that doesn't suck?

## The Solution

My solution is a two-parter. First, there's the
[Megatech-Vulkan Dispatch](https://github.com/gn0mesort/megatech-vulkan-dispatch) library. It's a pretty simple
<span class="nowrap">C++20</span> library that stores Vulkan function pointers in arrays. Second, there's a Python
script that generates the actual lists of Vulkan commands used in the <span class="nowrap">C++</span> library. This
script is actually where a lot of the magic is happening.

The script, which is a part of the
[Megatech-Vulkan Dispatch Tools](https://github.com/gn0mesort/megatech-vulkan-dispatch-tools) package, is used to
extract information from the XML representation of Vulkan. The script reads the XML specification, parses it, and
extracts the bits relevant to commands. At that point it reads and renders a [Mako](https://www.makotemplates.org/)
template to generate its output. The trick, in so far as any of this is a trick, is that the script understands enough
of the Vulkan specification to provide the input template with very specific lists of commands. A user could, for
example, ask it to only provide commands that are available in Vulkan 1.0, `VK_KHR_surface`, `VK_KHR_xcb_surface`, and
`VK_KHR_swapchain`. The script also understands dependencies between Vulkan features. This means that if a user
requests a feature but doesn't request the feature's dependencies, the script will report an error.

The library is all about keeping things simple. As I already said, its main job is to store function pointers in
arrays. It's not exactly rocket science. The library provides three dispatch table objects (one for each level of
Vulkan functionality). When an application initializes a dispatch table, the library loads the function pointers for
the corresponding level of functionality. To retrieve a function pointer the application queries the dispatch table
using either an index (in the form of a scoped enumeration value) or a hash value (computed using the 64-bit
[FNV-1a](https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function) hash function). In either case,
the library prefers to resolve these operations at compile-time. Basically, the strategy is to pay for loading Vulkan
commands up front so that applications don't have to call `vkGetInstanceProcAddr` or `vkGetDeviceProcAddr` in their
main loop.

## Thoughts

Something I've been coping with a lot lately is realizing how obsessive I can be. I have a terrible time letting go of
things, and it's even worse when I'm being told I can't do something. Vulkan is quickly becoming one of my obsessions.
I simply can't stand the idea that mastering it is too hard for me.

The dispatch problem is one I've tackled before (my previous project is [VKFL](https://github.com/gn0mesort/vkfl)),
but I think this implementation is better considered than my previous work. Previously, I had used indexing as the
exclusive method for accessing Vulkan commands. Since the library can be compiled with different sets of available
commands, this could lead to an issue where an application would need to be recompiled any time the library changed.
I guess a lot of software is that way ultimately, but the hash API that I've provided here solves the issue in this
case. I think splitting the dispatch table up by level is a much better approach too. Previously, I had one dispatch
table type that would be updated to use new functionality as it became available. This is fine for a Vulkan
application with a single instance and device, but for multiple devices it permits some kind of weird behavior. The
implementation I've used for this project, I think, is much clearer about what a client application should do (i.e.,
give each device its own table).

I'm not super enthusiastic about this Vulkan dispatch thing to be clear. To me this is just a good way to get back to
thinking about Vulkan. Dispatch tables aren't a huge technical achievement, but they are something I need to build
further Vulkan tools. My actual interest is in building a highly configurable graph-based 3D renderer.

That isn't to say I think this is bad work though. There are other solutions to this floating around out there. The
two I'm familiar with most, [Volk](https://github.com/zeux/volk) and
[vulkan.hpp](https://github.com/KhronosGroup/Vulkan-Hpp)'s `DispatchLoaderDynamic`, both have features I think are
undesirable. Hopefully, Megatech-Vulkan Dispatch is useful to anyone who feels the more mainstream approaches don't
fit into their application. Even if my library doesn't fit, I hope the generator script is at least instructive to
some degree.

On a more personal note, I've been pretty up and down lately. Some days I'm feeling very positive and can get a lot
done. Other days, I just end up sleeping. The killer heat here hasn't helped in that regard. I'll just keep drinking
water and pushing forward though.

Writing these posts is always a struggle and I don't get much done around them. Once, this is published though, I can
get started on my next thing. Right now, I'm thinking of continuing on with Vulkan. If I get bored, I might switch
gears to another game project instead. That's just life, I try to focus on one thing but end up focusing on something
else entirely.

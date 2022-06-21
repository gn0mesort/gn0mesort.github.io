---
title: "Slog 2.0"
subtitle: ""
description: ""
date: 2022-06-18T00:00:00-07:00
toc: true
---

## Week in Review

In my last post, I said I intended to spend the week working on various Vulkan and X11 things. That hasn't happened
because I was working on another project. Alongside my personal interests, I've also been for game projects to work on.
Mostly, these projects haven't panned out. The usual conversation I have is something like, "what kind of game
are you interested in working on?"

"Oh! It's really cool! I've had this idea forever!"

"Could you describe the mechanics to me?"

"Well, you're a knight from the kingdom of `fantasy_name` and you go on a quest to save the princess!"

"That sounds cool but I need to have something specific to work on. If you can get me some kind of explanation of the
game we can discuss it again."

"Oh alright." Followed by radio silence, obviously.

I don't fault people for being like this. I was definitely exactly like this until, maybe, my senior year of high
school (2010 can you believe that?). Around that time I started to get more interested in the actual mechanics of 
computer games rather than just the idea of a game as a vehicle for a story. These days I tend to agree with this
quote from *Masters of Doom*:

> "Story in a game," [Carmack] said, "is like a story in a porn movie; it's expected to be there, but it's not that
> important."

This position probably seems a bit dismissive (because it is). However, I think it reveals something crucially unique
about interactive media. Interactive media (which games definitely are and perhaps porn movies are too) is all about
experience. When a person plays a computer game the written text, music, or video is far less important than their 
experience as an actor in the game. *Doom* certainly exemplifies this (since the story is more or less there as a joke)
but I think it's true of less action focused games as well. *Dark Souls* and *King's Field* come to mind as obvious
examples but they're far from the only ones.

Anyway, I did ultimately find a project that I think is more feasible than usual. It took about 3 weeks of back of and
forth to get the designer/director/sound guy I'm currently working with to come up with anything resembling game
mechanics but he, ultimately, did. Getting to a point of having something workable has been a huge process and,
honestly, I'm not optimistic about the project's prospects. It's still a lot better than nothing though and It's
given me a chance to work directly with [Godot](https://godotengine.org/) 3.4.

## Whining about Godot

Godot is impressive for what it is. I can't think of another open source game engine that is as well established or as
capable. Working with it though, even for a week, has really cemented my dislike of "game engines". In retrospect, I
might have preferred to work with Unity or Unreal despite their proprietary nature (although you can access the source
for Unreal as long as you have a license). The biggest bother of Godot, so far, is GDScript.

I don't find GDScript difficult to use. It's basically Python and does many of the things I dislike about Python
(weird mixed dynamic/static typing, whitespace delineated scopes, etc.). These are mostly minor inconveniences though.
What I find really troubling about GDScript is the lack of clear specifics for basic properties of the language. There
is, for example, an `int` type as you would expect. The documentation page for GDScript's `int` tells us the following:

> Signed 64-bit integer type.
>
> It can take values in the interval [-2^63, 2^63 - 1], i.e. [-9223372036854775808, 9223372036854775807]. Exceeding those bounds will wrap around.

What it doesn't tell us is how this value is actually represented. I've assumed, so far, that it's two's complement
because C++20 requires integer types to be two's complement. This seems to work fine but without inspecting the
language implementation there's no good way to know if -1 is `0xffffffffffffffff`, `0x80000000000001`,
`0xfffffffffffffffe`, or some representation that is less obvious. This particular gripe probably seems minor to anyone
less interested in clever bit fiddling than me but it's part of a larger theme with the language. Another example, both
`int` and `float` types are said to be 64-bit but `PoolIntArray` and `PoolRealArray` (the corresponding typed arrays)
use 32-bit values. Vectors (i.e., the equivalents of the GLSL `vec2` and `vec3` not `std::vector`) are also 32-bit
floating point values. This is not documented on the corresponding documentation pages for the `Vector2` or `Vector3`
type of course. Instead it's noted on the documentation page for the `float` type. Similar to `int`, the
representation of floating point values is unclear except that the documentation says it corresponds to the C++
`double`. Is it IEEE-754? Probably, but who really knows! I could go on about these vagaries for a while longer but
it's just gripes all the way down.

I think, the big lesson from this is that it would be best to avoid bespoke programming languages. Godot's website
gives a laundry list of reasons why GDScript was a good idea but I'd rather just program in C++ personally. I read,
somewhere, that during the transition from Unreal 3 to Unreal 4 there were a lot of discussions about the utility and
viability of UnrealScript. Obviously, UnrealScript is no longer with us. Instead Unreal just uses C++ (and apparently
some new languages in Unreal 5). I kind of think they got the right of it. C++ is old and in some ways it's kind of
crusty but it's also increasingly clearly defined and supported pretty much everywhere already.

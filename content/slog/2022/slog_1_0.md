---
title: "Slog 1.0"
subtitle: ""
description: "About the Slog"
date: 2022-06-10
toc: true
---
## About the Slog

I haven't published any of my thoughts online in quite a while. I think it's been about a year but, honestly, I've
lost track. When I was younger I didn't have much of a filter about publishing. I would just write whatever I liked
and it would go up on MySpace (later I would have used Facebook). I certainly didn't worry about grammar, sourcing my
claims, or presenting any coherent arguments. As I've gotten older I've lost my ability to write freely.

Instead of writing freely, I'm much more careful today. Part of that comes from having a more educated perspective on
how to write. Mostly though, I think I'm just more anxious than I was as a teenager. The result is that I have a
relatively small online footprint. I'm comfortable with that, of course, but it also means I have no record of my
thoughts.

Not having any record of what I am doing or why is a huge issue for me. When it comes to projects with clear
timelines, objectives, and technical requirements this isn't an issue. Often what that amounts to, though, is
schoolwork. I'm really good at schoolwork but I'm not great at keeping up with my own interests. I lose track of what
I was doing, I don't keep detailed notes, I revisit the same issues over and over, and just generally work in circles.
That's why I want to start writing more often. I think that by keeping a log or journal of my thoughts I can stay more
focused and committed to projects that I actually care about.

I think that keeping a record of what I've been up to here (in my stream of consciousness log) will help me focus.
However, there needs to be some rules about how I approach it. Otherwise, I'll be so anxious about presentation that
nothing will ever get written. Firstly, I'll be writing whatever is on my mind. I'm not going to worry too much about
structure or coherence. Entries in this log might have focused topics but I might just ramble a bit too. Second,
grammar and spelling are going to be secondary concerns. I'll probably run a spellcheck on each entry before publishing
but I'm not going to worry too much about grammar. Third, I'm not going to worry about sourcing every single claim I
make. This log will be a place for my opinions and like most opinions many will probably be unfounded. Hopefully, by
sticking to these rules I can keep a regular record of where I'm at without getting too anxious about the details.

What this means is that, if you're reading this, you should be aware of a few basic things:

1. This is not a formal discussion of any topic. You should not treat anything I say here as authoritative in any
   sense.
2. You should expect to see grammar and spelling mistakes. Entries might be edited for grammar and spelling after the
   fact or I might just leave the mistakes in.
3. You should not expect everything I say to be correct or even in the ballpark of correct.

At some point, I would like to also publish more thoroughly thought through articles but they will be in a different
section. Beside that, my thinking right now is that I would like to publish a new entry here at least once a week. I
think that I can reasonably do that for the foreseeable future.

## Current Projects

Recently, I've been working on two parallel projects. These are [VKFL](https://github.com/gn0mesort/vkfl/) and
[Oberon](https://github.com/gn0mesort/oberon/). VKFL is a simple thing. It provides a convenient way for me to load
the various Vulkan API function pointers and store them. Oberon is the more ambitious project. In theory, I want it to
be a library for doing real-time 3D rendering with Vulkan. In practice right now it does very little.

The problem I have, working on Oberon, is that it's very difficult to build useful abstractions with limited
experience. Without a concrete application, I don't have much to go on. I've had some success reading other open source
applications (especially [VkQuake](https://github.com/Novum/vkQuake)) but they don't feel like a substitute for a
practical application I've written myself. I think, if I want to make actual progress I'll have to first work on a
specific application instead of trying to build a library.

I've been mulling over the idea of using a highly specific application (i.e., one written specifically for the
environment I'm using on my machine) as a way to feel out the what and how of library code. I would start by
introducing features in the application. Then, once I was happy with the functionality, I could start thinking about
abstracting it and promoting the abstraction to Oberon. This also has the added benefit of being more fun.

As for VKFL, I don't know that there's much to be done with it. Originally, I based it on
[Volk](https://github.com/zeux/volk). Since then though, I've skimmed some of the corresponding code in the
[Mesa](https://mesa3d.org/) Vulkan implementation. Mesa uses a [Mako]( https://www.makotemplates.org/) template to
generate dispatch tables. The solution I'm using right now is pretty portable because it only requires standard Python
modules. However, Mako templates are a lot more flexible which has gotten me thinking about changing my approach. I
would also like to switch from the standard `xml.etree` module to the equivalent
[defusedxml](https://pypi.org/project/defusedxml/) module.

To sum up, I'm probably going to spend the next week buried in X11 and Vulkan documentation. Hopefully, I can make
more progress than I have over the last year or so though.

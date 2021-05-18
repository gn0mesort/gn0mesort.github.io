---
title: "Oberon Log #0"
description: "Developing my own 3D applications."
keywords:
  - oberon
  - vulkan
  - linux
  - 3d
  - graphics
  - c++
  - programming
date: 2021-05-18T11:00:00-07:00
---

I’ve decided to begin working on a 3D library and applications. This project is something I’ve toyed with privately
over the last couple of years. It’s been a lot of fun to learn about the various things OpenGL (4.x) and Vulkan can do
in that time. However, I find it difficult to work consistently without any public scrutiny (potential or actual).
Working in private is also extraordinarily isolating, and I hope that by regularly publishing my thoughts, I can become
a little less isolated. For now, I’m calling this project Oberon (or `liboberon`). Not for any particular reason.
Initially, I thought that the library might also tie into a game project titled Oberon. For the time being, I believe
that a project like that is too ambitious.

Specifically my goals are as follows:

1. Write a library in some mixture of C and C++ on which a hardware accelerated 3D application could be based.
2. Make use of Vulkan, X11, and Linux.
3. Write some number of example applications of the library.
4. Incrementally improve my knowledge of computer graphics and software engineering.
5. Provide a record of what I'm doing for myself and others who might find it useful in the future.

I will be publishing code [here](https://github.com/gn0mesort/oberon).

---
title: Mandelbrot Set
subtitle: ""
subtitleattribution: ""
subtitlework: ""
description: "Drawing fractals in OpenGL 4.5."
summary: "Drawing the Mandelbrot set."
keywords:
    - mandelbrot set
    - opengl
    - sdl2
    - c++
    - c++20
date: 2024-10-25T17:03:10-07:00
publishdate: 2024-10-25
toc: true
backrefs: true
highlighter: false
showdates: true
nolist: false
---

## Introduction

I didn't think I'd be writing anything this soon after my last post. I was starting to brainstorm some game ideas,
because that's what I wanted to do. Then outside forces kind of led me astray. At first, I just wanted to get back
to rendering something. Then, I had a pretty bad day on Sunday (<span class="nowrap">October 20, 2024</span>). I
guess, I was just in a weird mood and I decided to work it out by staying up all night (I didn't go to sleep until
around 10:00 the next day). I spent most of the night writing [a program](https://github.com/gn0mesort/mandelbrot-set)
that draws the [Mandelbrot set](https://en.wikipedia.org/wiki/Mandelbrot_set) fractal. The result worked acceptably,
but I decided I could do a bit better if I gave it a few more days of work. That's what I ended up doing, and here we
are.

<a href="/img/mandelbrot_1_1920x1080.png">
  <picture class="framed">
    <img alt="An image of a fractal." class="aspect-16-9" src="/img/mandelbrot_1_640x360.avif" />
  </picture>
</a>

## The Problem

I wasn't really in the frame of mind to think about, like, software requirements when I started this project. Here's
the basic idea though.

First off, the goal was to write a hardware accelerated version of one of the basic
[plotting algorithms for the Mandelbrot set](https://en.wikipedia.org/wiki/Plotting_algorithms_for_the_Mandelbrot_set).
I've always thought of this kind of thing as being a sort of elite high math topic, perhaps only accessible to some
sort of math elves, but the computation isn't actually that complex. Secondly, I wanted to do this with
[OpenGL](https://www.opengl.org/) and [SDL](https://www.libsdl.org/) instead of having a weird obsessive need to
maximize my burden with [Vulkan](https://www.vulkan.org/) (and maybe [X11](https://www.x.org/wiki/)). Finally, after
completing my all-night session I wanted to ensure the resulting software was presentable and polished enough that I
could call it complete.

<a href="/img/mandelbrot_2_1920x1080.png">
  <picture class="framed">
    <img title="Be wary of Elden Ring" alt="An image of a fractal." class="aspect-16-9" src="/img/mandelbrot_2_640x360.avif" />
  </picture>
</a>

## The Solution

Ok, I'm going to go point by point here too.

To get the actual image drawn, I implemented a screen-space approach. The computation happens in the fragment shader
and it's a two-step process. First, the shader computes a recursive series defined as
<code>z<sub>0</sub>&nbsp;=&nbsp;(0,&nbsp;0),&nbsp;z<sub>n</sub>&nbsp;=&nbsp;z<sub>n-1</sub><sup>2</sup>&nbsp;+&nbsp;c</code>.
Here, `c` is the two-dimensional coordinate of the fragment on the screen. The shader does some preprocessing to map
the discrete coordinate into range and to adjust for the camera's position too. If the series diverges to infinity
(i.e., <code>|z<sub>n</sub>|&nbsp;>&nbsp;2<sup>16</sup></code>) or the shader reaches the 1000<sup>th</sup> term, the
first step ends. The  second step is simpler. Using the last computed term, the shader maps the term's index to a
color in a 256-color  palette. The specific palette I chose is called
[Cividis](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0199239). There's also a black and white
variant where coordinates that diverge to infinity are black and finite coordinates are white.

Despite my initial view that this was some real MIT/Berkeley/Stanford-level stuff, it isn't really that much math. I
won't pretend I get it, but the implementation is straight-forward.

<a href="/img/mandelbrot_3_1920x1080.png">
  <picture class="framed">
    <img alt="An image of a fractal." class="aspect-16-9" src="/img/mandelbrot_3_640x360.avif" />
  </picture>
</a>

On the CPU-side of the application, I used SDL2 and OpenGL 4.5 (loaded via [Glad](https://github.com/Dav1dde/glad)). I
have plenty of complaints about this, but it really was the right choice. If I had gone with Vulkan and directly
fiddling with X11 it would have taken me a month or more to finish. As usual, with C APIs like these, a lot of the
program is just about handling their inconsistent error mechanisms. Initially, I wrote the application with no error
handling at all. Instead of checking info logs to determine why my shader didn't work, at various points, I just ran
[Renderdoc](https://renderdoc.org/) (compiling this from source was tricky) and prayed. After my all-night jam
session, I went back and added all the error handling. It's nothing special. If any call to SDL or OpenGL fails, the
application just bails out.

<a href="/img/mandelbrot_4_1920x1080.png">
  <picture class="framed">
    <img alt="An image of a fractal." class="aspect-16-9" src="/img/mandelbrot_4_640x360.avif" />
  </picture>
</a>

As far as structure, the program is pretty normal. It starts with initializing SDL and creating an OpenGL context.
Next, I prepare my shaders, a vertex array, and vertex and index buffers. This is all just to draw a rectangle to the
entire drawable area. This first phase of the program also sets up some miscellaneous OpenGL stuff (e.g., setting the
clear color to gray, enabling [MSAA](https://en.wikipedia.org/wiki/Multisample_anti-aliasing), and enabling
[sRGB](https://en.wikipedia.org/wiki/SRGB) conversion). Next, the application enters its main loop. Again, the loop is
pretty standard stuff. I (stack) allocate a bunch of variables for various controls and conditions. At the top of the
loop I compute the delta-time of the frame and render the current frame from scratch. After that, I collect input from
SDL, and update my control state. The loop ends by updating the camera's position. When the loop is broken, the
program ends with tear down.

The last bit of any real interest is the code that updates the camera based on the state of the controls. My initial
implementation didn't have controls at all. Instead, the view would just zoom in and out based on the program's run
time. That kind of sucked though because a user couldn't zoom in on all the fine details of the fractal. To improve
things I added simple controls which were triggered directly by SDL events. It was a serviceable implementation, but
it wasn't smooth because it wasn't delta-timed. Instead, the camera just teleported around. To smooth things out, I
created a little extra state for the keyboard controls, added proper delta-timing, and ensured zoom changes were
linearly interpolated. I think the results are pretty smooth.

## Thoughts

Based on what I said in the introduction, it should be obvious that this project didn't really come from a good
place. I was really feeling down on myself and I needed a win to get back in the right mindset. Now, I'm feeling 
alright, so the project did its job. I still want to do something more significant, but it's really hard to focus
on all the boilerplate for Vulkan when I'm struggling in other ways. Game design is like that for me too. I don't want
to just cowboy another little terminal game. I want to make something half-way decent, but even a thin slice of a
half-way decent game requires a lot of design work.

I'm happy that I made something that I think is beautiful for once, but it's still not good enough for me. A lot of
the time I wonder, are the barriers really self-imposed? Is pizza, Diet Coke, and a cheap PC really all I need to make
it? It sure feels like millions of dollars of capitalization would make things easier.

<a href="/img/mandelbrot_5_1920x1080.png">
  <picture class="framed">
    <img alt="An image of a fractal." class="aspect-16-9" src="/img/mandelbrot_5_640x360.avif" />
  </picture>
</a>

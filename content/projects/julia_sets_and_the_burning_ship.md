---
title: Julia Sets and the Burning Ship
subtitle: ""
subtitleattribution: ""
subtitlework: ""
description: "Rendering some more fractals."
summary: "Drawing the Burning Ship fractal and animating through Julia sets."
keywords:
    - julia set
    - burning ship fractal
    - animation
    - opengl
    - sdl2
    - c++
    - c++20
date: 2025-02-21T16:59:10-08:00
publishdate: 2025-02-22
toc: true
backrefs: true
highlighter: true
showdates: true
nolist: false
---

<div>
  <canvas id="julia-set-context" class="hide centered framed" alt="An animation of a variety of Julia sets" width="640" height="360"></canvas>
  <script src="/js/julia_set.js"></script>
</div>

## Introduction

Lately, I've been working with a student interested in computer graphics. Right now, we're stuck in terminal land
(i.e., the land of [bullshit std::cin-based menus](/code/toy_sorter/)), so drawing anything is kind of out of the
question. Nonetheless, I thought converting my [Mandelbrot set](https://en.wikipedia.org/wiki/Mandelbrot_set) program
into a standard I/O-based program would be pretty easy. I was right about this and started thinking about other
fractals I could render this way.

This led me back to Wikipedia to look at other escape-time fractals. In particular, I picked out the
[Burning Ship](https://en.wikipedia.org/wiki/Burning_Ship_fractal) fractal and an animation of various
[Julia sets](https://en.wikipedia.org/wiki/Julia_set) to work on. Besides standard I/O implementations
(which lack animation), I also wanted to implement these in [OpenGL](https://www.khronos.org/opengl/) by forking my
[Mandelbrot set program](/projects/mandelbrot_set/).

Getting these new fractals working was pretty simple.

## The Problem

The Burning Ship fractal is much simpler than the animated Julia sets, so I'll cover that first. If you recall, the
series <code>z<sub>0</sub> = 0</code>, <code>z<sub>n</sub> = z<sub>n-1</sub><sup>2</sup> + c</code> defines the
Mandelbrot set. A complex coordinate `c` is in the Mandelbrot set when the `z`'s magnitude does not diverge to
infinity for that complex coordinate. The Burning Ship fractal is the same. However, the series is
<code>z<sub>0</sub> = 0</code>,
<code>z<sub>n</sub> = (|Re(z<sub>n-1</sub>)| + |Im(z<sub>n-1</sub>)| * i)<sup>2</sup> + c</code>. In
[GLSL](https://en.wikipedia.org/wiki/OpenGL_Shading_Language), you can implement this version by simply applying the
`abs` function to the `z` vector. No biggie.

<a href="/img/burning_ship_1_1920x1080.png">
  <picture class="framed">
    <img class="aspect-16-9" alt="An image of the Burning Ship fractal." src="/img/burning_ship_1_640x360.avif" />
  </picture>
</a>

The Julia sets are a little harder to get working. Here, the defining series is still
<code>z<sub>n</sub> = z<sub>n-1</sub><sup>2</sup> + c</code>. However, <code>z<sub>0</sub></code> is now the varying
complex coordinate, and `c` is a complex constant. Selecting the constant `c` is crucial to getting any interesting
output. In my case, I've chosen <code>0.7885 * e<sup>A * i</sup></code>, where `A` varies between `0` and `2π`. Yes, I
did select this based on Wikipedia. I'm a programmer, so I'm not a serious engineer. Please don't trust me to build a
bridge. You'll die! Implementing this requires new software on the host side, so a simple shader change won't cut it
like with the Burning Ship.

<a href="/img/julia_set_1_1920x1080.png">
  <picture class="framed">
    <img class="aspect-16-9" alt="An image of a bunny Julia set fractal." src="/img/julia_set_1_640x360.avif" />
  </picture>
</a>

## The Solution

For the [Burning Ship](https://github.com/gn0mesort/burning-ship/), my solution is nearly identical to my
[Mandelbrot set implementation](https://github.com/gn0mesort/mandelbrot-set/). It's really as simple as a
small shader edit changing:

```glsl
for (i = 0; length(z) <= 65536 && i < max_iterations; ++i)
{
  z = cx_multiply(z, z) + c;
}
```

to

```glsl
for (i = 0; length(z) <= 65536 && i < max_iterations; ++i)
{
  z = cx_multiply(abs(z), abs(z)) + c;
}
```

That's really it.

<a href="/img/burning_ship_2_1920x1080.png">
  <picture class="framed">
    <img class="aspect-16-9" alt="An image of the Burning Ship fractal." src="/img/burning_ship_2_640x360.avif" />
  </picture>
</a>

There are changes in the shader and host programs for the [Julia sets](https://github.com/gn0mesort/julia-set/). On
the shader side, I first had to introduce a new uniform for the value `c`. I also had to modify the initial
definition of `z`. In the Mandelbrot program, `z` starts as `vec2(0, 0)`. However, for the Julia sets, it's
initialized to the fragment coordinate scaled between `-2` and `2` on both axes. On the host side, I'm computing and
supplying the value of `c`.

I've introduced a few constants (`A_MIN`, `A_MAX`, and `ANIMATION_SPEED`) to do this. `A_MIN` (a/k/a `0`) and `A_MAX`
(a/k/a `2π`) represent the range of values to compute `c` from. `c` itself is computed assuming
<code>B * e<sup>A * i</sup> = B * cos(A) + B * sin(A) * i</code>. Once per frame, this is computed for `B = 0.7885`.
The value of `A` varies in steps of `0.01` multiplied by `ANIMATION_SPEED` and scaled by the frame's delta time. It
always starts at `0`. This behavior reflects when `A` reaches `A_MAX` or `A_MIN` (i.e.,
<code>A<sub>n</sub> = A<sub>n-1</sub> + 0.01</code>, <code>A<sub>0</sub> = 0</code> until
<code>A<sub>n</sub> = 2π</code>. After that point <code>A<sub>n</sub> = A<sub>n-1</sub> - 0.01</code>,
<code>A<sub>0</sub> = 2π</code> until <code>A<sub>n</sub> = 0</code>). The result is a smooth transition from `0` to
`2π`.

<a href="/img/julia_set_2_1920x1080.png">
  <picture class="framed">
    <img class="aspect-16-9" alt="An image of a Julia set fractal." src="/img/julia_set_2_640x360.avif" />
  </picture>
</a>

Since the Julia sets are not a single fractal but an animated transition through a series of fractals, I've also
added a pause function. This allows users to stop the animation at any point and inspect any part of a particular
frame. Getting this to work was a little finicky because pausing is a boolean, whereas the other controls are
continuous.

In both cases, the result is a nice rendering of the respective fractals with the same parallel computation as my
Mandelbrot program.

<a href="/img/julia_set_3_1920x1080.png">
  <picture class="framed">
    <img class="aspect-16-9" alt="An image of a Julia set fractal." src="/img/julia_set_3_640x360.avif" />
  </picture>
</a>

## Thoughts

I'm writing this immediately after finishing the previous [Megatech-Vulkan article](/projects/megatech_vulkan_0_1_0/),
so I don't have much new on my mind. These programs mainly show how much you can get done without a solid
mathematical foundation. I'm not mathematically skilled enough to explain why these programs generate the interesting
images they do. On the other hand, I clearly am clever enough to make them work. I guess there's a long tradition of
this in the software world. Dijkstra is probably rolling in his grave.

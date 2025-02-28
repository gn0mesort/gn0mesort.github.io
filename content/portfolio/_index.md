---
title: Portfolio
subtitle: ""
subtitleattribution: ""
subtitlework: ""
description: "Alexander Rothman's portfolio."
keywords:
    - portfolio
    - c++
    - html
    - css
    - javascript
    - python
    - xml
    - vulkan
    - opengl
    - skills
date: 2024-11-09T20:19:31-08:00
publishdate: 2024-11-09
toc: false
backrefs: false
highlighter: false
showdates: false
nolist: false
layout: single
---

<div class="portfolio-grid">
  <h2 class="head">Fractal Renderings</h2>
  <div class="links block">
    [<a href="https://github.com/gn0mesort/mandelbrot-set">Mandelbrot Set</a>]&nbsp;[<a href="https://github.com/gn0mesort/burning-ship">The Burning Ship</a>]&nbsp;[<a href="https://github.com/gn0mesort/julia-set">Julia Sets</a>]<br />
    [<a href="/projects/mandelbrot_set/">Article 1</a>]&nbsp;[<a href="/projects/julia_sets_and_the_burning_ship/">Article 2</a>]
  </div>
  <dl class="skills inner-grid">
    <dt>Operating System</dt>
    <dd>Linux</dd>
    <dt>Languages</dt>
    <dd>C++20, GLSL, JavaScript</dd>
    <dt>APIs</dt>
    <dd>OpenGL 4.5, SDL2, WebGL 2</dd>
    <dt>Tools</dt>
    <dd>Meson, Git, GNU Debugger (gdb)</dd>
  </dl>
  <dl class="main inner-grid widen-rows">
    <dt>What</dt>
    <dd>Rendering programs for the Mandelbrot set, the Burning Ship fractal, and Julia sets.</dd>
    <dt>How</dt>
    <dd>I used SDL2 to handle window system integration and input. The renderings are done using an OpenGL fragment shader. This makes the image computation highly parallel. I've also provided a WebGL 2 implementation embedded in the second article.</dd>
    <dt>Why</dt>
    <dd>These were exploratory projects. I wanted to learn more about how these fractals are generated, and how to produce them with only a fragment shader.</dd>
  </dl>
</div>
<div class="portfolio-grid">
  <h2 class="head">Megatech-Assertions</h2>
  <div class="links block">
    [<a href="https://github.com/gn0mesort/megatech-assertions">Library</a>]<br />
    [<a href="/projects/megatech_assertions/">Article</a>]
  </div>
  <dl class="skills inner-grid">
    <dt>Operating System</dt>
    <dd>Linux</dd>
    <dt>Languages</dt>
    <dd>C++20</dd>
    <dt>Tools</dt>
    <dd>Meson, Git, GNU Debugger (gdb)</dd>
  </dl>
  <dl class="main inner-grid widen-rows">
    <dt>What</dt>
    <dd>A C++20 library that provides extended debug assertion functionality. This includes formatted messages in assertions and thread-safety for parallel assertion failures.</dd>
    <dt>How</dt>
    <dd>I provided assertion functionality in two ways. First, there are a large number of public function-like macros that provide this library's interface. Second, there are a small number of functions that implement the assertions. Inside the assertion functions, I've implemented robust error handling to ensure that failures are reported. This includes handling cases where formatting fails, formatting isn't available, and when assertions fail on multiple threads in short succession.</dd>
    <dt>Why</dt>
    <dd>I've never been particularly happy with the standard <code>assert</code> macro in C++. Compared to other programming environments, it is very bare-bones. I wanted to provide greater support for custom assertion messages for my own use. I also felt it was crucial to be able to handle extreme cases like reporting as many failures across parallel threads of execution as possible.</dd>
  </dl>
</div>
<div class="portfolio-grid">
  <h2 class="head">Megatech-Vulkan Dispatch</h2>
  <div class="links block">
    [<a href="https://github.com/gn0mesort/megatech-vulkan-dispatch">Library</a>]&nbsp;[<a href="https://github.com/gn0mesort/megatech-vulkan-dispatch-tools">Generator</a>]<br />
    [<a href="/projects/megatech_vulkan_dispatch">Article</a>]
  </div>
  <dl class="skills inner-grid">
    <dt>Operating System</dt>
    <dd>Linux</dd>
    <dt>Languages</dt>
    <dd>C++20, Python3, XML</dd>
    <dt>APIs</dt>
    <dd>Vulkan</dd>
    <dt>Tools</dt>
    <dd>Meson, Git, GNU Debugger (gdb)</dd>
  </dl>
  <dl class="main inner-grid widen-rows">
    <dt>What</dt>
    <dd>A cross-platform dynamic dispatch solution for the Vulkan API that doesn't pollute the global namespace or overly bloat programs.</dd>
    <dt>How</dt>
    <dd>Megatech-Vulkan Dispatch has two parts. First, I wrote a generator script in Python 3. This parses the Vulkan API specification and generates C++ headers. Second, I wrote a C++20 library that loads Vulkan command function pointers at run-time.</dd>
    <dt>Why</dt>
    <dd>I'm not a fan of other dispatch solutions. The most popular solution, Volk, uses primarily global names, provides minimal configuration, and generates a very large header file. I wanted to solve these problems.</dd>
  </dl>
</div>
<div class="portfolio-grid">
  <h2 class="head">Sunset 76 Customer Landing Page</h2>
  <div class="links block">
    [<a href="https://sunset76.com">Page</a>]<br />
    [<a href="/projects/sunset_76">Article</a>]
  </div>
  <dl class="skills inner-grid">
    <dt>Operating System</dt>
    <dd>Linux</dd>
    <dt>Languages</dt>
    <dd>HTML, CSS, JavaScript</dd>
    <dt>Tools</dt>
    <dd>LiteSpeed Web Server, cPanel, Git</dd>
  </dl>
  <dl class="main inner-grid widen-rows">
    <dt>What</dt>
    <dd>A customer landing page for an auto repair business.</dd>
    <dt>How</dt>
    <dd>Over the course of the project, I worked with management at Sunset 76 to design and deploy a single page solution that complies with modern search engines. I wrote the page using vanilla HTML, CSS, and JavaScript. I also ensured it could be deployed without any outages on the client's side.</dd>
    <dt>Why</dt>
    <dd>Sunset 76 contracted me for two reasons. First, their previous web presence had been under construction since around 2006 with no completion date in sight. Second, their lack of web presence was leading to a large number of customer phone calls. I resolved both problems.</dd>
  </dl>
</div>
<div class="portfolio-grid">
  <h2 class="head">Godot 3 Patch for Doomsday Paradise</h2>
  <div class="links block">
    [<a href="https://github.com/gn0mesort/godot/tree/3.5-CJK">Patch</a>]&nbsp;[<a href="https://store.steampowered.com/app/1603420/Doomsday_Paradise/">Steam</a>]<br />
    [<a href="/projects/godot_3_x_patch_for_doomsday_paradise">Article</a>]
  </div>
  <dl class="skills inner-grid">
    <dt>Operating System</dt>
    <dd>Linux, Windows</dd>
    <dt>Languages</dt>
    <dd>C++</dd>
    <dt>APIs</dt>
    <dd>Godot 3.5</dd>
    <dt>Tools</dt>
    <dd>SCons, Git, GNU Debugger (gdb)</dd>
  </dl>
  <dl class="main inner-grid widen-rows">
    <dt>What</dt>
    <dd>A custom patch to the Godot 3.5 source code that fixes automatic line breaking issues with Traditional Chinese and Japanese text.</dd>
    <dt>How</dt>
    <dd>Through judicious use of my debugger, I crawled through the Godot source code to discover the root causes of the error. Godot 3.5 uses two different automatic line breaking approaches, and both needed to be patched. I developed extended functionality that correctly encoded grammar rules for Traditional Chinese and Japanese text and modified the <code>RichTextLabel</code> and <code>Label</code> nodes in Godot 3.5 to support my new functionality.</dd>
    <dt>Why</dt>
    <dd>Lemonade Flashbang was on a tight deadline and wanted to show their game, Doomsday Paradise, at the Bitsummit game festival. However, manually fixing text rendering would have been extremely time consuming. They contracted me to deliver quickly and under budget. I was able to deliver a patch with time to spare.</dd>
  </dl>
</div>

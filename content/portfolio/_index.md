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
publishdate: 2025-03-16
toc: false
backrefs: false
highlighter: false
showdates: false
nolist: false
layout: single
---

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
    <dd><span class="nowrap">C++</span></dd>
    <dt>APIs</dt>
    <dd>Godot 3.5</dd>
    <dt>Tools</dt>
    <dd>SCons, Git, GNU Debugger (gdb)</dd>
  </dl>
  <dl class="main inner-grid widen-rows">
    <dt>What</dt>
    <dd>I fixed Godot 3.5's line breaking implementation for Traditional Chinese and Japanese text in the <code>RichTextLabel</code> and <code>Label</code> nodes, making it handle CJK and mixed language text correctly. I also ensured the default functionality could be restored with a toggle.</dd>
    <dt>How</dt>
    <dd>I debugged Godot 3.5's source code with <code>gdb</code>, tracing macros by hand, and patched it without any external libraries to avoid extra hassle.</dd>
    <dt>Why</dt>
    <dd>Lemonade Flashbang hired me to get their game ready for <a href="https://bitsummit.org/">Bitsummit</a> and Steam. I fixed their problem inside of 17 hours to meet the tight deadline for their demo.</dd>
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
    <dd><span class="nowrap">C++20</span>, Python3, XML</dd>
    <dt>APIs</dt>
    <dd>Vulkan</dd>
    <dt>Tools</dt>
    <dd>Meson, Git, GNU Debugger (gdb)</dd>
  </dl>
  <dl class="main inner-grid widen-rows">
    <dt>What</dt>
    <dd>I built a <span class="nowrap">C++</span> dispatch library to preload Vulkan command pointers, offering index and hash access, plus a Python package to generate custom command sets from Vulkan’s XML specification. It’s lean compared to <a href="https://github.com/zeux/volk">Volk</a> at around 50KiB and it builds without a dependency on Vulkan.</dd>
    <dt>How</dt>
    <dd>I wrote a Python3 script to parse the XML and generate a tailored command list while checking feature dependencies. Then I wrote a <span class="nowrap">C++20</span> library to create compile-time tables from the generated lists.</dd>
    <dt>Why</dt>
    <dd>I wanted a cleaner, smaller, and more configurable alternative to Volk for my own Vulkan projects (like <a href="https://github.com/gn0mesort/megatech-vulkan">Megatech-Vulkan</a>).</dd>
  </dl>
</div>
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
    <dd><span class="nowrap">C++20</span>, GLSL, JavaScript</dd>
    <dt>APIs</dt>
    <dd>OpenGL 4.5, SDL2, WebGL 2</dd>
    <dt>Tools</dt>
    <dd>Meson, Git, GNU Debugger (gdb)</dd>
  </dl>
  <dl class="main inner-grid widen-rows">
    <dt>What</dt>
    <dd>I wrote three <span class="nowrap">C++</span> programs to render the Mandelbrot set, Burning Ship fractal, and animated Julia sets using OpenGL 4.5 and SDL2, plus a WebGL 2 version of the Julia sets embedded in my blog.</dd>
    <dt>How</dt>
    <dd>I rendered each fractal using GLSL fragment shaders. I implemented panning and zooming by scaling and offsetting the generated fractal. In the case of the animated Julia sets, I also iterate a complex constant to create the animated effect.</dd>
    <dt>Why</dt>
    <dd>I wanted to dig into real-time graphics with something tangible, then expanded it to include Julia sets and the Burning Ship.</dd>
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
    <dd><span class="nowrap">C++20</span></dd>
    <dt>Tools</dt>
    <dd>Meson, Git, GNU Debugger (gdb)</dd>
  </dl>
  <dl class="main inner-grid widen-rows">
    <dt>What</dt>
    <dd>I wrote a <span class="nowrap">C++20</span> library to replace standard assertions with thread-safe versions that support formatted messages using <code>std::vformat_to</code> or <code>std::vsnprintf</code>, plus precondition and postcondition checks.
    <dt>How</dt>
    <dd>I built it with no dependencies beyond the <span class="nowrap">C++</span> standard library, using mutexes and condition variables for thread safety and a fixed-size thread-local buffer to handle formatting without allocation risks.</dd>
    <dt>Why</dt>
    <dd>I got tired of basic asserts without runtime messages or formatting and wanted a cleaner way to debug my own projects with detailed failure output.</dd>
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
    <dd>I built a static and responsive web page for an auto repair business with contact info, business hours, and other information all in HTML and CSS with media queries.</dd>
    <dt>How</dt>
    <dd>I wrote the HTML and CSS from scratch and iterated the design with the client. Then I wrestled Turbify’s hosting and LiteSpeed setup to serve the page cleanly while maintaining uptime.</dd>
    <dt>Why</dt>
    <dd>Sunset 76 hired me to replace a flaky old site that had been causing customers to call in asking about hours and services.</dd>
  </dl>
</div>

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
  <h2 class="head">Mandelbrot Set Rendering</h2>
  <div class="links block">
    [<a href="https://github.com/gn0mesort/mandelbrot-set">Application</a>]&nbsp;[<a href="/projects/mandelbrot_set">Blog</a>]
  </div>
  <dl class="skills inner-grid">
    <dt>Operating System</dt>
    <dd>Linux</dd>
    <dt>Languages</dt>
    <dd>C++20, GLSL</dd>
    <dt>APIs</dt>
    <dd>OpenGL 4.5, SDL2</dd>
    <dt>Tools</dt>
    <dd>Meson, Git</dd>
  </dl>
  <dl class="main inner-grid widen-rows">
    <dt>Problem</dt>
    <dd>The challenge was to create a hardware accelerated program that renders the Mandelbrot set fractal using OpenGL 4.5 in real time.</dd>
    <dt>Solution</dt>
    <dd>I developed a custom Mandelbrot Set rendering program using SDL2 and OpenGL 4.5. I implemented a screen-space approach that offloads all of the rendering onto a dedicated GPU.</dd>
    <dt>Outcome</dt>
    <dd>The resulting program renders the Mandelbrot Set in real time. It also allows smooth panning and zooming, so that users can examine the fine details of the fractal.</dd>
  </dl>
</div>
<div class="portfolio-grid">
  <h2 class="head">Megatech-Vulkan Dispatch</h2>
  <div class="links block">
    [<a href="https://github.com/gn0mesort/megatech-vulkan-dispatch">Library</a>]&nbsp;[<a href="https://github.com/gn0mesort/megatech-vulkan-dispatch-tools">Generator</a>]&nbsp;[<a href="/projects/megatech_vulkan_dispatch">Blog</a>]
  </div>
  <dl class="skills inner-grid">
    <dt>Operating System</dt>
    <dd>Linux</dd>
    <dt>Languages</dt>
    <dd>C++20, Python3, XML</dd>
    <dt>APIs</dt>
    <dd>Vulkan</dd>
    <dt>Tools</dt>
    <dd>Meson, Git</dd>
  </dl>
  <dl class="main inner-grid widen-rows">
    <dt>Problem</dt>
    <dd>Truly cross-platform Vulkan applications require dynamic dispatch. However, existing solutions require relatively large header files and pollute the global namespace.</dd>
    <dt>Solution</dt>
    <dd>I developed an object-oriented dynamic dispatch solution for Vulkan. The library leverages a generator script written in Python which parses the Vulkan specification and extracts only the desired commands.</dd>
    <dt>Outcome</dt>
    <dd>The resulting library allows users to preload Vulkan command function pointers which significantly increases performance in hot code paths (compared to resolving commands as needed). The generator script allows users to create builds of the library that preload only the subset of Vulkan API versions and extensions that their application requires.</dd>
  </dl>
</div>
<div class="portfolio-grid">
  <h2 class="head">Sunset 76 Customer Landing Page</h2>
  <div class="links block">
    [<a href="https://sunset76.com">Page</a>]&nbsp;[<a href="/projects/sunset_76">Blog</a>]
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
    <dt>Problem</dt>
    <dd>Sunset 76, an auto repair business, needed to develop a new landing page for customers. The page needed to be extremely simply while maintaining a pleasant responsive look on all common devices. It was crucial that the new web page did not disrupt Sunset 76's existing IT infrastructure.</dd>
    <dt>Solution</dt>
    <dd>I developed a static single page solution for Sunset 76 leveraging modern CSS layouts (i.e., grids and flex boxes) to maintain responsiveness to user devices. I took care, when deploying the page, to ensure 100% uptime while working within Sunset 76's existing web hosting arrangements.</dd>
    <dt>Outcome</dt>
    <dd>Sunset 76 saw drastically decreased customer service calls following the deployment of the new page.</dd>
  </dl>
</div>
<div class="portfolio-grid">
  <h2 class="head">Godot 3 Patch for Doomsday Paradise</h2>
  <div class="links block">
    [<a href="https://github.com/gn0mesort/godot/tree/3.5-CJK">Application</a>]&nbsp;[<a href="https://store.steampowered.com/app/1603420/Doomsday_Paradise/">Steam</a>]&nbsp;[<a href="/projects/godot_3_x_patch_for_doomsday_paradise">Blog</a>]
  </div>
  <dl class="skills inner-grid">
    <dt>Operating System</dt>
    <dd>Linux, Windows</dd>
    <dt>Languages</dt>
    <dd>C++</dd>
    <dt>APIs</dt>
    <dd>Godot 3.5</dd>
    <dt>Tools</dt>
    <dd>SCons, Git</dd>
  </dl>
  <dl class="main inner-grid widen-rows">
    <dt>Problem</dt>
    <dd>Lemonade Flashbang, an independent game developer, needed to develop a patch for Godot 3.5 that fixed issues with Godot's automatic line-breaking algorithms. Godot 3.5, did not implement standard Unicode breaking algorithms for CJK (Chinese, Japanese Korean) languages. Additionally, the patch needed to be completed in time for the Bitsummit game festival in Japan.
    <dt>Solution</dt>
    <dd>I developed a patch for Godot 3.5 that implements two solutions for automatic line-breaking in Traditional Chinese and Japanese text. The solution uses a broader context to determine when it is grammatically correct to insert a soft line break in CJK text without negatively affecting run-time performance.
    <dt>Outcome</dt>
    <dd>Lemonade Flashbang was able to demonstrate their game at the Bitsummit festival as well as release the finished game on Steam later the same year.</dd>
  </dl>
</div>

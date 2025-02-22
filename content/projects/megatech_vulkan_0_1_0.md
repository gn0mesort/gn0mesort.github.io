---
title: Megatech-Vulkan 0.1.0
subtitle: ""
subtitleattribution: ""
subtitlework: ""
description: "Publishing my initial work on Megatech-Vulkan."
summary: "Initial work on the Megatech-Vulkan software library."
keywords:
    - vulkan
    - sdl2
    - c++
    - c++20
date: 2025-02-21T12:24:50-08:00
publishdate: 2025-02-22
toc: true
backrefs: true
highlighter: true
showdates: true
nolist: false
---

## Introduction

Last September, [I wrote about Megatech-Vulkan Dispatch](/projects/megatech_vulkan_dispatch/). That was my
[Vulkan](https://www.vulkan.org/) dispatch table project. At the time, I said, "I thought it would be fun to return to
writing my own Vulkan API toolkit." However, the dispatch stuff was just a foundation. This project,
[Megatech-Vulkan](https://github.com/gn0mesort/megatech-vulkan/), is the broader toolkit.

Specifically, my goal isn't just a vague Vulkan toolkit library. I'm interested in providing a directed acyclic
graph-based scheduling solution for Vulkan operations. My thinking is that, with the correct architecture, I can
obviate many of Vulkan's more annoying aspects. At the same time, I want to keep much of the low-level flexibility
that I would lose with [OpenGL](https://www.khronos.org/opengl/). Anyway, this release is just a tiny part of that.

This release, which is not a completed project but a partial release, covers one facet of that problem. How do I make
bootstrapping Vulkan simple? Generally, the more dynamism you need, the more complex things get with Vulkan.
Managing that flexibility is a significant pain point for a library because you can't make too many predictions about
how a client application would like to leverage your software.

## The Problem

The problem is this: Vulkan needs to know what features an application wants to use during initialization. Vulkan has
many components that can all be considered features. First and most obviously, there are core API versions and
extensions. Next, the properties of physical devices can be regarded as features. This includes anything in a
`VkPhysicalDevice*Properties*` structure (e.g.,
[`VkPhysicalDeviceVulkan11Properties::maxMemoryAllocationSize`](https://registry.khronos.org/vulkan/specs/latest/man/html/VkPhysicalDeviceVulkan11Properties.html)).
It also includes other physical device properties like queue family descriptions (i.e.,
[`VkQueueFamilyProperties`](https://registry.khronos.org/vulkan/specs/latest/man/html/VkQueueFamilyProperties.html))
and memory details (i.e.,
[`VkPhysicalDeviceMemoryProperties`](https://registry.khronos.org/vulkan/specs/latest/man/html/VkPhysicalDeviceMemoryProperties.html)).
There's more than that, too. Physical devices can also have boolean features. Anything in a
`VkPhysicalDevice*Features*` structure is fair game. Managing all of this is tedious but doable. What's complex is
how it all interacts.

One example of such an interaction comes
[directly from the specification](https://registry.khronos.org/vulkan/specs/latest/man/html/VkPhysicalDeviceProperties.html#_description):

> The value of `apiVersion` may be different than the version returned by `vkEnumerateInstanceVersion`; either higher
> or lower. In such cases, the application must not use functionality that exceeds the version of Vulkan associated
> with a given object. The `pApiVersion` parameter returned by `vkEnumerateInstanceVersion` is the version associated
> with a `VkInstance` and its children, except for a `VkPhysicalDevice` and its children. 
> `VkPhysicalDeviceProperties::apiVersion` is the version associated with a `VkPhysicalDevice` and its children.

The specification means this: it is valid for a Vulkan instance to support one version of the core functionality and
each of its physical devices to support other versions. The direction of this is arbitrary, so you have to ensure your
application doesn't use the wrong version with the wrong objects. This is just one of the issues.

There can be interactions between extensions in the same way. There are some naive cases here. For example,
[`VK_KHR_swapchain`](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_swapchain.html) depends upon
[`VK_KHR_surface`](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_surface.html). It doesn't make
sense to enable swapchains without the surfaces. Other cases can be much more complex. For example, using input
attachments with dynamic rendering requires either
[`VK_KHR_dynamic_rendering`](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_dynamic_rendering.html)
or Vulkan 1.3 at a minimum. It also requires that the dynamic rendering feature is available and enabled (i.e., either
[`VkPhysicalDeviceDynamicRenderingFeaturesKHR::dynamicRendering`](https://registry.khronos.org/vulkan/specs/latest/man/html/VkPhysicalDeviceDynamicRenderingFeaturesKHR.html)
must be true or
[`VkPhysicalDeviceVulkan11Features::dynamicRendering`](https://registry.khronos.org/vulkan/specs/latest/man/html/VkPhysicalDeviceVulkan11Features.html)
must be true depending on the path you're taking). After that, you also need the
[`VK_KHR_dynamic_rendering_local_read`](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_dynamic_rendering_local_read.html)
extension or Vulkan 1.4. If you're using `VK_KHR_dynamic_rendering_local_read`, you also need to check
[`VkPhysicalDeviceDynamicRenderingLocalReadFeaturesKHR::dynamicRenderingLocalRead`](https://registry.khronos.org/vulkan/specs/latest/man/html/VkPhysicalDeviceDynamicRenderingLocalReadFeaturesKHR.html)
or
[`VkPhysicalDeviceVulkan14Features::dynamicRenderingLocalRead`](https://registry.khronos.org/vulkan/specs/latest/man/html/VkPhysicalDeviceVulkan14Features.html).
If you have Vulkan 1.4, you need to additionally check
[`VkPhysicalDeviceVulkan14Properties::dynamicRenderingLocalReadDepthStencilAttachments`](https://registry.khronos.org/vulkan/specs/latest/man/html/VkPhysicalDeviceVulkan14Properties.html)
and `VkPhysicalDeviceVulkan14Properties::dynamicRenderingLocalReadMultisampledAttachments` to check for depth/stencil
and multisampled image support. To my knowledge, there are no equivalent properties to check with the extension alone. 
This is still just the most trivial type of interaction.

There can also be interactions between otherwise independent extensions. For example,
[`VK_EXT_pipeline_robustness`](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_EXT_pipeline_robustness.html)
only depends on
[`VK_KHR_get_physical_device_properties2`](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_get_physical_device_properties2.html)
or Vulkan 1.1 being present. However, it has a list of interactions with other extensions that may or may not be
enabled alongside it. There can also be interactions or  dependencies with shading language (i.e.,
[SPIR-V](https://www.khronos.org/spirv/) and [GLSL](https://en.wikipedia.org/wiki/OpenGL_Shading_Language)) extensions.

I'm probably glossing over some complexity here, but there is still another way all of these features can interact.
Vulkan layers can introduce their own versions of instance and device extensions. On my system, the only layer that
does this is
[`VK_LAYER_KHRONOS_validation`](https://vulkan.lunarg.com/doc/view/latest/linux/khronos_validation_layer.html).
Regardless, this means you might have features only available in certain configurations or features with slightly
different behavior in certain configurations (e.g., my driver provides
[`VK_EXT_debug_utils`](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_EXT_debug_utils.html) revision 2,
but my validation layer only provides revision 1). I can't imagine many cases where this is a big deal, but it's
another thing to worry about.

From my perspective, this makes writing a library that uses Vulkan a colossal pain. If library clients can configure
even a minimal amount of Vulkan's behavior, it can become impossible to predict precisely how the API will behave. In
my opinion, there are basically two options. Either you create a thin wrapper around Vulkan and require the client to
manage all of this, or you decide what Vulkan can and cannot do for the client.

If you go the latter route, there are still problems. For one, there's no good way to know how Vulkan should be loaded.
A library might shake its head and link [libvulkan](https://github.com/KhronosGroup/Vulkan-Loader) regardless, but
this constrains it to systems where libvulkan is available. Similarly, there's no good way to know when or how to
integrate window systems. A library can always require
[`VK_KHR_win32_surface`](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_win32_surface.html) for
Windows systems, and it's probably safe. On other systems, like the Linux system I'm writing this article on, there
can be several different window systems. There are also platform independent frameworks to consider. Ideally, you
would select only the features you need. Were it so easy.

In my opinion, anyone wanting to write a library that isn't a wrapper faces two conflicting concerns here. First, the
library author needs to control as much of the Vulkan configuration as is reasonable. Doing anything else makes it
impossible to know what correct operation looks like. Second, the library author needs to allow configuration by client
applications wherever platform specifics come into play (e.g., loading and window systems). In short, a library needs
to be configurable, but it can't be too configurable.

## The Solution

My solution to this is straightforward. First, I've done my best to minimize how much configuration can be done
through the public API. Applications of my API can make three decisions: whether to initialize debugging tools, which
Vulkan layers the application explicitly enables, and which devices the application selects for initialization.
Anything outside of this is off-limits to the public.

My approach requires using what I'm calling an adaptor to handle the platform-specific stuff. Adaptors are separate
libraries that implement loading and, potentially, window system integration. Right now, I've only written a basic
adaptor for libvulkan. This adaptor loads Vulkan by linking directly to libvulkan and pulls everything else out of
[`vkGetInstanceProcAddr`](https://registry.khronos.org/vulkan/specs/latest/man/html/vkGetInstanceProcAddr.html). Since
there's no standard window system integration, the libvulkan adaptor doesn't provide any.

I'm using a pointer to implementation approach to keep applications out of the library's internals. A few objects in my
library don't do this (e.g.,
[`megatech::vulkan::physical_device_list`](https://github.com/gn0mesort/megatech-vulkan/blob/v0.1.0/include/megatech/vulkan/physical_devices.hpp)),
but all the core objects hold pointers to their implementation. This provides a couple of benefits. The most important
benefit is that it separates my API into two levels: public and internal. Secondarily, it ensures that Vulkan is
safely encapsulated in the internal API. There's no need for client applications to know about or have any Vulkan
header files. For the implementation pointers, I've gone with
[`std::shared_ptr`](https://en.cppreference.com/w/cpp/memory/shared_ptr) for now. This enforces a correct destruction
order for dependent implementations (i.e., an instance implementation won't be destroyed until the application destroys
all of its devices) and reduces boilerplate (i.e., I don't have to provide destruction functors for opaque types as I
would with [`std::unique_ptr`](https://en.cppreference.com/w/cpp/memory/unique_ptr)). I
may need to change this later, though.

My intention is that only adaptors will need to access the internal API. Right now, I've set the library up to require
adaptors to do this via inheritance. This means that an adaptor needs to extend at least the
[`megatech::vulkan::loader`](https://github.com/gn0mesort/megatech-vulkan/blob/v0.1.0/include/megatech/vulkan/loader.hpp)
and
[`megatech::vulkan::internal::base::loader_impl`](https://github.com/gn0mesort/megatech-vulkan/blob/v0.1.0/include/megatech/vulkan/internal/base/loader_impl.hpp)
types. However, it can also extend the implementation types for
[`megatech::vulkan::instance`](https://github.com/gn0mesort/megatech-vulkan/blob/v0.1.0/include/megatech/vulkan/instance.hpp)
and `megatech::vulkan::physical_device_description`. At the moment, this is very powerful. Adaptors can change around
which queues get allocated to which tasks, add extensions, and enable extra device features. In the future, I'll
probably remove most of this flexibility.

This architecture leads to a somewhat annoying drawback. Selecting the correct implementations of the various core
objects requires a set of methods in the `megatech::vulkan::loader` and `megatech::vulkan::instance` implementations. I
dislike this because it's relatively brittle. It relies on adaptors to figure out which implementations they want. The
default behavior, of course, is to use the implementations provided by the core library. Ideally, I'd like to identify
the correct implementation at compile time. Even more ideally, there would only need to be one implementation.

The rest of the library is about organizing and validating the Vulkan initialization process. Right now, I've kept
this minimal. I'm requiring Vulkan 1.3, dynamic rendering, and debug utils (for debug instances). I've also implemented
a method to determine if each device supports compute and transfer operations asynchronously from the main queue. I
don't intend to use this immediately, but it's a feature I want to have later on.

That's about all there is to say about this implementation right now. It's all about initialization and validation.
I've tried to keep it simple while also keeping client applications from having to understand too much about the
structure of Vulkan. I think the architecture is a bit rough around the edges, and I'll hopefully have it evened out
more in the future.

**tl;dr**

```cpp
#include <megatech/vulkan.hpp>
#include <megatech/vulkan/adaptors/libvulkan.hpp>

namespace mv = megatech::vulkan;

// An adaptor is needed to ensure the correct features and extensions are enabled.
// The libvulkan adaptor dynamically links libvulkan and enables only the core features required by Megatech-Vulkan.
// It doesn't support any window system integration.
namespace adaptor = mv::adaptors::libvulkan;

int main() {
  // Initialize a Vulkan instance.
  auto instance = mv::instance{ adaptor::loader{ }, { "My application", { 0, 1, 0, 0 } } };
  // Enumerate physical devices and ensure that there is a valid device
  auto physical_devices = mv::physical_device_list{ instance };
  if (physical_devices.empty())
  {
    return 1;
  }
  // Initialize the first valid Vulkan device.
  auto device = mv::device{ physical_devices.front() };
  return 0;
}
```

## Thoughts

Writing these articles always takes me a really long time because I'm so anxious about the particulars of what I say.
I felt confident in my architectural approach when I started writing this article. As I've written it, though, I've
become less and less confident.

Right now, I think the monolithic adaptor library isn't quite the correct approach. I'd like to separate this idea
into two separate types of libraries. Instead of having one library to handle loading and window system integration,
there would be one of each. I think this approach would let me tame the internal fiddliness of the current API.
When I initially envisioned the adaptor approach, I had [SDL2](https://wiki.libsdl.org/SDL2/FrontPage) in mind. SDL2
exposes Vulkan through its [`SDL_Vulkan_LoadLibrary`](https://wiki.libsdl.org/SDL2/SDL_Vulkan_LoadLibrary) and
[`SDL_Vulkan_GetVkGetInstanceProcAddr`](https://wiki.libsdl.org/SDL2/SDL_Vulkan_GetVkGetInstanceProcAddr) functions.
To do window system integration, it also exposes
[`SDL_Vulkan_GetInstanceExtensions`](https://wiki.libsdl.org/SDL2/SDL_Vulkan_GetInstanceExtensions), and
[`SDL_Vulkan_CreateSurface`](https://wiki.libsdl.org/SDL3/SDL_Vulkan_CreateSurface). My worry was about how to replace
the less generic Vulkan API calls with these platform-independent ones. My vision was there would be a
libmegatech-vulkan-adaptor-sdl2 that handled all of this.

Now, I think it makes more sense to split these. Instead of one library, there would be libmegatech-vulkan-loader-sdl2
and libmegatech-vulkan-wsi-sdl2. The loader library would be responsible for implementing a `loader` object (a required
parameter to `megatech::vulkan::instance`'s constructor) that handles `SDL_Vulkan_LoadLibrary`,
`SDL_Vulkan_GetVkGetInstanceProcAddr`, and `SDL_Vulkan_GetInstanceExtensions`. On the other hand,
libmegatech-vulkan-wsi-sdl2 would implement a `window_system` object (an optional parameter to
`megatech::vulkan::instance`'s constructor) that describes the window systems requirements. It would also be
responsible for implementing a `megatech::vulkan::surface` object.

Initially, I was hyped to get into my graph scheduling stuff once I published this article. Now, I think I'll go back
and work on the initialization architecture a bit first. At least, I don't anticipate the change I'm describing here
to take much time (maybe a weekend at most).

Outside of Vulkan stuff, I've got a new job. I'm not making much money, but it's helped my mood a bit. I've been moody
overall since December, so that's a good sign. The holidays always get to me, though. There's just no way for it not
to be a stressful situation.

While writing this, I've taken the time to write a couple more OpenGL fractal programs. I've been working with a
student interested in computer graphics, so I felt inspired to return to the Mandelbrot set. I'll do a brief write-up
about those programs soon (they're just forks of the program from last October). After that, I'm returning to Vulkan
to see how much progress I can make.

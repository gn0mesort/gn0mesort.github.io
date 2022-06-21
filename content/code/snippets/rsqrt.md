---
title: "rsqrt"
subtitle: ""
description: "Fast approximate inverse square root for IEEE-754."
date: 2022-04-25T10:53:14-07:00
toc: false
draft: false
---

```cpp
#include <cinttypes>

#include <bit>
#include <limits>

// Constants from Jan Kadlec's implementation
// <http://rrrola.wz.cz/inv_sqrt.html>
constexpr float rsqrt(const float x) {
  static_assert(std::numeric_limits<float>::is_iec559);
  auto f = std::bit_cast<float>(0x5f1ffff9U - (std::bit_cast<std::uint32_t>(x) >> 1));
  f *= 0.703952253f * (2.38924456f - x * f * f);
  return f;
}

// Magic number from Matthew Robertson.
// <https://cs.uwaterloo.ca/~m32rober/rsqrt.pdf>
constexpr double rsqrt(const double x) {
  static_assert(std::numeric_limits<double>::is_iec559);
  auto f = std::bit_cast<double>(0x5fe6eb50c7b537a9ULL - (std::bit_cast<std::uint64_t>(x) >> 1));
  f *= 0.5 * (3.0 - x * f * f); // Improved constants for 64-bit aren't known.
  return f;
}
```

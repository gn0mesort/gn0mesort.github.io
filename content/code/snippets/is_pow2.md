---
title: "is_pow2"
subtitle: ""
description: "Simple power of 2 check."
summary: "Simple power of 2 check."
date: 2022-03-29T20:14:58-07:00
highlighter: true
toc: false
---

```cpp
#include <concepts>

constexpr bool is_pow2(std::unsigned_integral auto x) {
  return x && !(x & (x - 1));
}


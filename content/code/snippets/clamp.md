---
title: "clamp"
description: "Branch free integer clamp."
summary: "Branch free integer clamp."
highlighter: true
date: 2022-06-18T00:00:00-07:00
---

```cpp
#include <concepts>

template <std::integral Type>
constexpr Type max(const Type a, const Type b) {
  return a ^ ((a ^ b) & -(a < b));
}

template <std::integral Type>
constexpr Type min(const Type a, const Type b) {
  return b ^ ((a ^ b) & -(a < b));
}

template <std::integral Type>
constexpr Type clamp(const Type value, const Type lo, const Type hi) {
  return min(max(value, lo), hi);
}
```

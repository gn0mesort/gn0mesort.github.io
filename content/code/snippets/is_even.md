---
title: "is_even"
subtitle: ""
description: "Two's complement integer parity checks."
date: 2022-04-11T21:36:21-07:00
toc: false
draft: false
---

```cpp
#include <concepts>

template <std::integral Type>
constexpr bool is_odd(Type x) {
  return x & 1;
}

template <std::integral Type>
constexpr bool is_even(Type x) {
  return !is_odd(x);
}

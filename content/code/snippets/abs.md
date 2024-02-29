---
title: "abs"
subtitle: ""
description: "Branch free absolute value for two's complement integers and IEEE-754."
summary: "Branch free absolute value for two's complement integers and IEEE-754."
date: 2022-04-11T20:57:57-07:00
toc: false
highlighter: true
draft: false
---

```cpp
#include <concepts>
#include <bit>
#include <limits>

template <std::signed_integral Type>
constexpr Type abs(Type x) {
  constexpr auto bits = std::numeric_limits<Type>::digits;
  return (x ^ (x >> bits)) - (x >> bits);
}

template <std::floating_point Type>
constexpr Type abs(Type x) {
  static_assert(std::numeric_limits<Type>::is_iec559);
  if constexpr (std::endian::native == std::endian::little)
  {
    reinterpret_cast<char*>(&x)[sizeof(Type) - 1] &= 0x7f;
  }
  else if constexpr (std::endian::native == std::endian::big)
  {
    reinterpret_cast<char*>(&x)[0] &= 0x7f;
  }
  return x;
}
```

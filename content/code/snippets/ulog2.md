---
title: "ulog2"
subtitle: ""
description: "Binary search based binary logarithm calculation."
summary: "Binary search based binary logarithm calculation."
date: 2022-03-29T13:39:00-07:00
highlighter: true
toc: false
---
```cpp
#include <cstddef>

#include <concepts>
#include <stdexcept>
#include <limits>

template <std::unsigned_integral Type>
constexpr Type ulog2(const Type x) {
  if (!x)
  {
    throw std::domain_error{ "ulog2(0) is undefined." };
  }
  auto right = static_cast<std::size_t>(std::numeric_limits<Type>::digits - 1);
  for (auto left = std::size_t{ 0 }, middle = left + ((right - left) >> 1); left <= right; middle = left + ((right - left) >> 1))
  {
    if (x >> middle != 0)
    {
      left = middle + 1;
    }
    else
    {
      right = middle - 1;
    }
  }
  return right;
}
```

---
title: "ulog2"
subtitle: ""
description: "Binary search based binary logarithm calculation."
date: 2022-03-29T13:39:00-07:00
toc: false
---
```cpp
#include <cinttypes>

#include <bit>
#include <type_traits>
#include <concepts>
#include <stdexcept>
#include <limits>

template <std::unsigned_integral Type>
constexpr Type ulog2(const Type x) {
  if (!x)
  {
    throw std::domain_error{ "ulog2(0) is undefined." };
  }
  constexpr auto bits = std::numeric_limits<Type>::digits;
  auto middle = bits >> 1;
  for (auto left = std::size_t{ 0 }, right = bits; left <= right; middle = (right + left) >> 1)
  {
    auto cmp = std::bit_cast<std::make_signed_t<Type>>(x - (Type{ 1 } << middle));
    if (cmp > 0)
    {
      left = middle + 1;
    }
    else if (cmp < 0)
    {
      right = middle - 1;
    }
    else
    {
      return middle;
    }
  }
  return middle;
}
```

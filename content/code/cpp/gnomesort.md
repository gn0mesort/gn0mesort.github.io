---
title: "Gnomesort"
date: 2020-07-08T08:49:02-07:00
description: "A simple sort."
draft: true
---

This is a generic implementation of the gnomesort in C++. The function signatures are intended to be similar to the
C++20 versions of `std::sort`.

```cpp
#include <utility>
#include <iterator>
#include <functional>

template <typename RandomIt, typename Compare>
constexpr void gnomesort(RandomIt first, RandomIt last, Compare comp) {
  if (first == last)
  {
    return;
  }
  auto pos = first;
  while (pos < last)
  {
    if (pos == first || !comp(*pos, *(pos - 1)))
    {
      ++pos;
    }
    else
    {
      std::swap(*pos, *(pos - 1));
      --pos;
    }
  }
}

template <typename RandomIt>
constexpr void gnomesort(RandomIt first, RandomIt last) {
  using value_type = typename std::iterator_traits<RandomIt>::value_type;
  gnomesort(first, last, std::less<value_type>{ });
}
```

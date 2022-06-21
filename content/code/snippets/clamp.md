---
title: "clamp"
description: "Branch free integer clamp."
date: 2022-06-18T00:00:00-07:00
---

```cpp
#include <concepts>

template <std::integral Type>
constexpr Type clamp(const Type value, const Type lo, const Type hi) {
    const auto hilo = (-(value > hi) & hi) | (-(value < lo) & lo);
    return (-!hilo & value) | hilo;
}
```

---
title: "fcmp"
subtitle: ""
description: "Floating-point comparison functions."
summary: "Floating-point comparison functions."
date: 2025-08-22T16:21:00-07:00
toc: false
highlighter: true
draft: false
---

```cpp
#include <cmath>

#include <concepts>
#include <limits>

// Taken from https://floating-point-gui.de/errors/comparison/
template <std::floating_point Type>
constexpr bool fequal(const Type a, const Type b, const Type epsilon) {
    const Type abs_a = std::fabs(a);
    const Type abs_b = std::fabs(b);
    const Type difference = std::fabs(a - b);
    if (a == b)
    {
        return true;
    }
    else if (a == Type{ 0 } || b == Type{ 0 } || (abs_a + abs_b < std::numeric_limits<Type>::min()))
    {
        return difference < (epsilon * std::numeric_limits<Type>::min());
    }
    else
    {
        return difference / std::min(abs_a + abs_b, std::numeric_limits<Type>::max()) < epsilon;
    }
}

template <std::floating_point Type>
constexpr bool fequal(const Type a, const Type b) {
    return fequal(a, b, std::numeric_limits<Type>::epsilon());
}

template <std::floating_point Type>
constexpr bool flessthan(const Type a, const Type b, const Type epsilon) {
    return a < b && !fequal(a, b, epsilon);
}

template <std::floating_point Type>
constexpr bool flessthan(const Type a, const Type b) {
    return a < b && !fequal(a, b, std::numeric_limits<Type>::epsilon());
}

template <std::floating_point Type>
constexpr bool fgreaterthan(const Type a, const Type b, const Type epsilon) {
    return a > b && !fequal(a, b, epsilon);
}

template <std::floating_point Type>
constexpr bool fgreaterthan(const Type a, const Type b) {
    return a > b && !fequal(a, b, std::numeric_limits<Type>::epsilon());
}
```

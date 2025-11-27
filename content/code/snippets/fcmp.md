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

template <std::floating_point Type>
struct tolerances final {
    static constexpr Type absolute_tolerance{ 0 };
    static constexpr Type relative_tolerance{ 1e-9 };
};

template <std::floating_point Type>
constexpr bool is_close(const Type a, const Type b, const Type absolute_tolerance, const Type relative_tolerance) {
  if (a == b)
  {
    return true;
  }
  if (std::isinf(a) || std::isinf(b))
  {
    return false;
  }
  const auto difference = std::fabs(b - a);
  return difference <= std::fabs(relative_tolerance * b) ||
         difference <= std::fabs(relative_tolerance * a) ||
         difference <= absolute_tolerance;
}

template <std::floating_point Type>
constexpr bool is_close(const Type a, const Type b, const Type absolute_tolerance) {
  return is_close(a, b, absolute_tolerance, tolerances<Type>::relative_tolerance);
}

template <std::floating_point Type>
constexpr bool is_close(const Type a, const Type b) {
  return is_close(a, b, tolerances<Type>::absolute_tolerance, tolerances<Type>::relative_tolerance);
}

template <std::floating_point Type>
constexpr bool is_almost_equal(const Type a, const Type b, const Type absolute_tolerance) {
  if (a == b)
  {
    return true;
  }
  if (std::isinf(a) || std::isinf(b))
  {
    return false;
  }
  return std::fabs(b - a) <= absolute_tolerance;
}

template <std::floating_point Type>
constexpr bool is_almost_zero(const Type a, const Type absolute_tolerance) {
  return is_almost_equal(a, Type{ 0 }, absolute_tolerance);
}
```

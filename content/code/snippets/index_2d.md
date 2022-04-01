---
title: "index_2d"
subtitle: ""
description: "2D index into a 1D array."
date: 2022-03-29T20:18:59-07:00
toc: false
---

```cpp
#include <cinttypes>

template <bool IsRowMajor, typename SizeType = std::size_t>
class basic_indexer_2d final {
public:
    using size_type = SizeType;
private:
  size_type m_stride{ };
public:
  explicit constexpr basic_indexer_2d(const size_type stride) : m_stride{ stride } { }
  constexpr basic_indexer_2d(basic_indexer_2d&& other) = default;
  constexpr basic_indexer_2d(const basic_indexer_2d& other) = default;

  constexpr ~basic_indexer_2d() noexcept = default;

  constexpr basic_indexer_2d& operator=(basic_indexer_2d&& rhs) = default;
  constexpr basic_indexer_2d& operator=(const basic_indexer_2d& rhs) = default;
  constexpr size_type operator()(const size_type row, const size_type column) const noexcept {
    if constexpr (IsRowMajor)
    {
        return (row * m_stride) + column;
    }
    else
    {
        return (column * m_stride) + row;
    }
  }
};

using row_major_indexer_2d = basic_indexer_2d<true>;
using column_major_indexer_2d = basic_indexer_2d<false>;
```

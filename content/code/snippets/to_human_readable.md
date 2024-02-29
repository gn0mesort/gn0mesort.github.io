---
title: "to_human_readable"
subtitle: ""
description: "Convert an unsigned integer byte count to a human readable string."
summary: "Convert an unsigned integer byte count to a human readable string."
date: 2022-04-13T13:35:38-07:00
toc: false
highlighter: true
draft: false
---

```cpp
#include <cmath>

#include <string>
#include <sstream>
#include <iomanip>
#include <limits>
#include <bit>

enum class byte_unit_type {
  binary, // 1 KiB = 1024 B
  decimal, // 1 KB = 1000 B (like hard drive vendors)
  customary // 1 KB = 1024 B (like Windows)
};

template <byte_unit_type Units = byte_unit_type::binary>
std::string to_human_readable(const std::size_t bytes) {
  constexpr auto units = "KMGTPEiB";
  constexpr auto unit_ending = Units == byte_unit_type::binary ? &units[6] : &units[7];
  constexpr auto kilo = Units != byte_unit_type::decimal ? 1024 : 1000;
  auto format_stream = std::ostringstream{ };
  if (bytes < kilo)
  {
    format_stream << bytes << " Bytes";
  }
  else
  {
    format_stream << std::fixed << std::setprecision(2);
    if constexpr (kilo == 1024)
    {
      constexpr auto bits = std::numeric_limits<std::size_t>::digits;
      const auto zeroes = (bits - std::countl_zero(bytes) - 1) / 10;
      const auto divisor = static_cast<double>(std::size_t{ 1 } << (zeroes * 10));
      format_stream << static_cast<double>(bytes) / divisor;
      format_stream << " " << units[zeroes - 1];
    }
    else if constexpr (kilo == 1000)
    {
      const auto pow1000 = static_cast<std::size_t>(std::floor(std::log(bytes) /
                                                    std::log(1000)));
      format_stream << static_cast<double>(bytes) / std::pow(1000, pow1000);
      format_stream << " " << units[pow1000 - 1];
    }
    format_stream << unit_ending;
  }
  return format_stream.str();
}
```

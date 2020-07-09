---
title: "Fizzbuzz"
date: 2020-07-07T10:43:15-07:00
description: "Your favorite program!"
draft: true
---

This version writes to an arbitrary std::ostream (probably std::cout though let's be honest).

```cpp
#include <cstddef>

#include <sstream>
#include <iostream>

void fizzbuzz(std::ostream& out, const std::size_t till) {
  auto s_out = std::ostringstream{ };
  for (auto i = 1U; i <= till; ++i)
  {
    s_out.str("");
    if (!(i % 3))
    {
      s_out << "Fizz";
    }
    if (!(i % 5))
    {
      s_out << "Buzz";
    }
    if (s_out.str().empty())
    {
      s_out << i;
    }
    out << s_out.str() << std::endl;
  }
}
```

---
title: "Fizzbuzz"
subtitle: ""
description: "The mandatory demonstration of minimum competency."
date: 2022-03-29T15:10:39-07:00
toc: true
---

Fizzbuzz in various languages just to demonstrate that I'm not totally useless.
Some solutions are unnecessarily clever.

## C89

```c
#include <stdio.h>

int main() {
    const char* msg = "Fizz\0Buzz";
    int i, j;
    for (i = 1, j = 0; i <= 100; ++i, j = (!(i % 3) << 1) | (!(i % 5)))
    {
        printf("%.*s%.*s%.*d\n", (j & 2) << 1, &msg[0], (j & 1) << 2, &msg[5], !j, i * !j);
    }
    return 0;
}
```

## C++20

```cpp
#include <cstdio>

#include <string_view>

int main() {
    constexpr auto msg = std::string_view{ "Fizz\0Buzz" };
    for (auto i = 1, j = 0; i <= 100; ++i, j = (!(i % 3) << 1) | (!(i % 5)))
    {
        std::printf("%.*s%.*s%.*d\n", (j & 2) << 1, &msg[0], (j & 1) << 2, &msg[5], !j, i * !j);
    }
    return 0;
}
```

## C#

```cs
using System;

class Program {
  public static void Main (string[] args) {
    for (int i = 1; i <= 100; ++i)
    {
      var message = "";
      if (i % 3 == 0)
      {
        message += "Fizz"; 
      }
      if (i % 5 == 0)
      {
        message += "Buzz";
      }
      if (message == "")
      {
        message = i.ToString();
      }
      Console.WriteLine(message);
    }
  }
}
```

## Java

```java
class Main {
  public static void main(String[] args) {
    for (int i = 1; i <= 100; ++i)
    {
      final StringBuilder builder = new StringBuilder();
      if (i % 3 == 0)
      {
        builder.append("Fizz");
      }
      if (i % 5 == 0)
      {
        builder.append("Buzz");
      }
      if (builder.isEmpty())
      {
        builder.append(i);
      }
      System.out.println(builder);
    }
  }
```

## Javascript

```js
for (let i = 1; i <= 100; ++i)
{
  let msg = '';
  if (i % 3 === 0)
  {
    msg += 'Fizz';
  }
  if (i % 5 === 0)
  {
    msg += 'Buzz';
  }
  console.log(msg || i);
}
```

## PHP

```php
<?php
  for ($i = 1; $i <= 100; ++$i)
  {
    $msg = '';
    if ($i % 3 === 0)
    {
      $msg = 'Fizz';
    }
    if ($i % 5 === 0)
    {
      $msg = $msg . 'Buzz';
    }
    if (strlen($msg) === 0)
    {
      $msg = "$i";
    }
    print("<p>$msg</p>");
  }
?>
```

## Python3

```py
for msg in [(lambda a: (lambda msg, b: msg + 'Buzz'
                        if b % 5 == 0 else msg)('Fizz', a)
             if a % 3 == 0 else (lambda d: 'Buzz'
                                 if d % 5 == 0 else str(d))(a))(i)
            for i in range(1, 101)]:
    print(msg)
```

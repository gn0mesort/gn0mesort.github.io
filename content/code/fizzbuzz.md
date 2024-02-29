---
title: "Fizzbuzz"
subtitle: ""
description: "The mandatory demonstration of minimum competency."
summary:
    "Fizzbuzz in various languages just to demonstrate that I'm not totally
    useless. Some solutions are unnecessarily clever."
date: 2022-03-29T15:10:39-07:00
toc: true
highlighter: true
backrefs: true
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

## C18 (Euler's Method)

```c
#include <stdio.h>

int main() {
  for (int i = 1; i <= 100; ++i)
  {
    switch ((i * i * i * i) % 15)
    {
    case 0:
      puts("FizzBuzz");
      break;
    case 1:
      printf("%d\n", i);
      break;
    case 6:
      puts("Fizz");
      break;
    case 10:
      puts("Buzz");
      break;
    default:
      break;
    }
  }
  return 0;
}
```

## C++20

```cpp
#include <cstdio>
#include <cstddef>

#include <array>
#include <string_view>

struct state final {
  char i{ };
  char j{ };
  char k{ };
  char jk{ };
};

template <std::size_t Max = 100>
consteval std::array<state, Max> states() {
  auto res = std::array<state, Max>{ };
  for (auto i = std::size_t{ 1 }; i <= Max; ++i)
  {
    res[i - 1].i = i;
    res[i - 1].j = -!(i % 3);
    res[i - 1].k = -!(i % 5);
    res[i - 1].jk = !(res[i - 1].j | res[i - 1].k);
    res[i - 1].i &= -res[i - 1].jk;
    res[i - 1].j &= 4;
    res[i - 1].k &= 4;
  }
  return res;
}

int main() {
  constexpr auto msg = std::string_view{ "Fizz\0Buzz" };
  for (const auto& state : states())
  {
    std::printf("%.*s%.*s%.*d\n", state.j, &msg[0], state.k, &msg[5], state.jk, state.i);
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
for msg in [(lambda a:
                (lambda msg, b:
                  msg + 'Buzz' if b % 5 == 0 else msg
                )('Fizz', a) if a % 3 == 0 else (lambda d:
                  'Buzz' if d % 5 == 0 else str(d)
                )(a)
            )(i)
            for i in range(1, 101)]:
    print(msg)
```

## x86-64 NASM

```x86asm
;
; Intended to be used with 64-bit GNU/Linux systems.
; Build:
;   nasm -felf64 -o fizzbuzz.o
;   gcc -o fizzbuzz fizzbuzz.o
;
extern printf

global main:function

section .text
           ONE_THIRD: equ 0xaaaaaaaaaaaaaaab
         THREE_SHIFT: equ 1
THREE_REMAINDER_MASK: equ 0xfffffffffffffffe
           ONE_FIFTH: equ 0xcccccccccccccccd
          FIVE_SHIFT: equ 2
 FIVE_REMAINDER_MASK: equ 0xfffffffffffffffc
main:
  push rbp
  mov rbp, rsp
  push rbx
  push r12
  push r13
  mov rbx, 1
main._loop:
  cmp rbx, 100
  jg main._exit
  xor r9, r9
  mov rax, rbx
  mov r10, ONE_THIRD
  mov r11, ONE_FIFTH
  mul r10
  mov r10, rdx
  mov r12, rdx
  mov rax, rbx
  mul r11
  mov r11, rdx
  mov r13, rdx
  shr r10, THREE_SHIFT
  shr r11, FIVE_SHIFT
  and r12, THREE_REMAINDER_MASK
  and r13, FIVE_REMAINDER_MASK
  add r12, r10
  add r13, r11
  mov r10, rbx
  mov r11, rbx
  sub r10, r12
  sub r11, r13
  cmp r10, 0
  setz r12b
  cmp r11, 0
  setz r13b
  mov rsi, FIZZ_LENGTH
  neg r12
  mov rcx, BUZZ_LENGTH
  neg r13
  and rsi, r12
  and rcx, r13
  mov r9, rsi
  lea rdi, [rel format]
  lea rdx, [rel fizz]
  lea r8, [rel buzz]
  or r9, rcx
  setz r9b
  mov rax, rbx
  neg r9
  and rax, r9
  and r9, 1
  push rax
  xor rax, rax
  call printf wrt ..plt
  add rsp, 8
  add rbx, 1
  jmp main._loop
main._exit:
  xor eax, eax
  pop r13
  pop r12
  pop rbx
  mov rsp, rbp
  pop rbp
  ret

section .rodata
       fizz: db `Fizz\0`
FIZZ_LENGTH: equ $-fizz
       buzz: db `Buzz\0`
BUZZ_LENGTH: equ $-buzz
     format: db `%.*s%.*s%.*llu\n\0`
```

---
title: Blog
style: /css/index.css
---

# Blog { .flex-item .flex-center }

## Contents { .flex-item .flex-center }

<div class="flex-item flex-center frame">
[[2018-08-15T06:34:41.789Z]  z](/blog/posts/z.html)<br />
[[2018-07-02T00:15:15.561Z]  offtrack](/blog/posts/offtrack.html)<br />
[[2018-06-15T06:14:57.816Z]  firstexercises](/blog/posts/firstexercises.html)<br />
[[2018-06-11T05:47:15.584Z]  newlook](/blog/posts/newlook.html)<br />
[[2018-04-23T10:36:06.000Z]  xv](/blog/posts/xv.html)<br />
[[2018-03-18T07:27:59.000Z]  green](/blog/posts/green.html)<br />
[[2018-03-08T17:14:49.000Z]  systemsanalysis](/blog/posts/systemsanalysis.html)<br />
[[2018-02-08T07:46:07.000Z]  getset](/blog/posts/getset.html)<br />
[[2017-11-14T05:46:38.000Z]  beenawhile](/blog/posts/beenawhile.html)<br />
[[2017-10-18T14:51:46.000Z]  timezone](/blog/posts/timezone.html)<br />
[[2017-10-12T06:10:41.000Z]  post_shirogane](/blog/posts/post_shirogane.html)<br />
[[2017-10-11T00:02:44.000Z]  shirogane](/blog/posts/shirogane.html)<br />
[[2017-08-22T01:06:19.000Z]  helloworld](/blog/posts/helloworld.html)<br />
</div>
## Latest Entry { .flex-item .flex-center }

<div class="flex-center frame blog">


# Z {.center }

To the Maiden who Travels the Planet,

I think this is going to be a long one. It's not only been a while but your birthday is coming up so I have quite a bit to say. I know that generally I don't address these directly (although perhaps my intended audience is obvious) but this time it feels important do away with a level of vagueness. I'm sorry for not writing you directly but I think that right now there would be too much of a fallout to do it. For what it's worth I'm alright and I've obviously not forgotten you (nor am I going to). Hopefully next year I'll be writing a different post. Maybe it will be the same as this year. I've come to accept that maybe I'll be typing out messages like this to essentially no one for the rest of my life. I think someday we'll reconnect though.

I'm sorry I didn't respond to your message. Not being able to sent me to a fairly dark place for the past month (or a little more now). I hope someday you find your way here and read this so you can know I haven't forgotten you. Being forgotten is worse than dSeath, or so I've heard. It's probably a bit stupid but I've been thinking a lot about a quotation about one of my favorite games:

```txt
In the real world things are very different. You just need to look around you.
Nobody wants to die that way. People die of disease and accident.
Death comes suddenly and there is no notion of good or bad.
It leaves, not a dramatic feeling but great empitiness.
When you lose someone you loved very much you feel this big empty space and
think, "If I had known this was coming I would have done things differently."
```

I feel like that quotation, in a somewhat odd fashion, describes how a feel much of the time. That isn't to say I'm truly unhappy or consumed totally by regret. I just think, `"If I had known this was coming, I would have done things differently."`

Perhaps in a really bizarre way I am exactly what I wanted to be. We don't always have the forethought to analyze who we idolize I suppose. The big difference between the real world and the games I play isn't so much the events but the amount of swordfighting that surrounds those events. The real world has basically zero swordfighting. It's probably a lot safer that way. 

Anyways I hope, as always, that you're well and that things go well for you this next year.

As always I've been up to some programming stuff that I should share. In keeping with my interest in programming exercises I've gone ahead and done two Euler Problems. The first of these (Problem 10) is as follows:

```txt
The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.

Find the sum of all the primes below two million.

```

Definitely doesn't seem like a difficult problem on the surface. The problem here is testing if a number is prime. A number, `n`, is prime if it only has factors of `1` and `n`. That means to be sure something is prime we have to factor it (at least enough to determine that it has a factor other than `1` and `n`). For, say, `4` this is easy. `4` has the factors `[ 1, 2, 4 ]` so it isn't prime. Doing the same test `13039` is not so easy (at least not by hand). This problem, [integer factorization](https://en.wikipedia.org/wiki/Integer_factorization), is known to be pretty hard. We could naively implement it as trial division which looks something like this:

```cpp
bool is_prime(const uint32_t n) {
  for (size_t i = 2; i < n; ++i) {
    if (i % n == 0) { return false; }
  }
  return true;
}
```

Basically we can test whether a number, `n`, is divisible by any other number in the range of `[2, n)`. At best the number is even and this fails on the first test. In the worst case the number is an exceptionally large prime and we will have to test everything between `2` and `n` to realize this. There are some obvious improvements that can be made on this (such as checking for divisibility by `2` with `if (!(n & 1))`. Unfortunately though no matter what we do this strategy is going to suck (at least a little bit).

It's kind of hard to figure out if any particular integer is prime.

Luckily we can just ignore figuring out whether or not every number between 1 and 2000000 is prime. We can just grab the prime numbers and ignore the rest. The method I used for doing this is the [Sieve of Eratosthenes](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes). There are (to my knowledge at least) significantly better prime sieves and my particular implementation is suboptimal. Nonetheless, this is a pretty easy method to understand.

My code is as follows:

```cpp
std::vector<uint64_t> sieve(const uint64_t max) {
  const uint64_t SIZE = max + 1;
  std::vector<uint64_t> numbers(SIZE);

  numbers[0] = SIZE;
  numbers[1] = SIZE;
  for (uint64_t i = 2; i < SIZE; ++i) { numbers[i] = i; }
  for (uint64_t i = 2; i < SIZE; ++i) {
    for (uint64_t j = i * 2; j < SIZE; j += i) { numbers[j] = SIZE; }
  }
  std::vector<uint64_t> r;
  for (const auto &number : numbers) {
    if (number <= max) { r.push_back(number); }
  }
  return r;
}
```

The basic idea here is to find all the numbers that are divisible by each prime we find. We very quickly run out of primes to try this way. To do this by hand we simply create a list of numbers from `0` to `n`. For `n = 29` it would look like this:

```txt
  0  1  2  3  4  5  6  7  8  9
 10 11 12 13 14 15 16 17 18 19
 20 21 22 23 24 25 26 27 28 29
```

We can start our search by simply eliminating `0` and `1` neither of which may be considered.

```txt
        2  3  4  5  6  7  8  9
 10 11 12 13 14 15 16 17 18 19
 20 21 22 23 24 25 26 27 28 29
```

Now starting at `2` we will eliminate every 2nd number

```txt
        2  3     5     7     9
    11    13    15    17    19
    21    23    25    27    29
```

It's starting to look a lot more sparse. We move on to `3` and eliminate every 3rd number

```txt
        2  3     5     7      
    11    13          17    19
          23    25          29
```

We've already eliminated `4` so we move on to `5` and eliminate every 5th number from there

```txt
        2  3     5     7      
    11    13          17    19
          23                29
```

My program would keep going from there and check all the numbers that are not eliminated in this fashion. We can recognize when we're through ahead of time though. The result here is the first 10 prime numbers `[ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29 ]`.

The rest of the problem is obvious fairly simple. We just need the sum of our result. The complete source for my solution to the problem is:

```cpp
#include <cstdint>
#include <cstddef>

#include <iostream>
#include <vector>

std::vector<uint64_t> sieve(const uint64_t max);

int main() {
  const uint64_t MAX = 2000000;
  uint64_t sum = 0;
  std::vector<uint64_t> numbers = sieve(MAX);

  for (uint64_t i = 0; i < numbers.size(); ++i) {
    sum += numbers[i];
    std::cout << numbers[i];
    if (i + 1 < numbers.size()) { std::cout << " + "; }
    else { std::cout << " = "; }
  }
  std::cout << sum << std::endl;
}

std::vector<uint64_t> sieve(const uint64_t max) {
  const uint64_t SIZE = max + 1;
  std::vector<uint64_t> numbers(SIZE);

  numbers[0] = SIZE;
  numbers[1] = SIZE;
  for (uint64_t i = 2; i < SIZE; ++i) { numbers[i] = i; }
  for (uint64_t i = 2; i < SIZE; ++i) {
    for (uint64_t j = i * 2; j < SIZE; j += i) { numbers[j] = SIZE; }
  }
  std::vector<uint64_t> r;
  for (const auto &number : numbers) {
    if (number <= max) { r.push_back(number); }
  }
  return r;
}
```

The answer is `142913828922`.

The second Euler Problem I completed (Problem 14) is as follows:

```txt
The following iterative sequence is defined for the set of positive integers:

n → n/2 (n is even)
n → 3n + 1 (n is odd)

Using the rule above and starting with 13, we generate the following sequence:
13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1

It can be seen that this sequence (starting at 13 and finishing at 1) contains 
10 terms. Although it has not been proved yet (Collatz Problem), it is thought 
that all starting numbers finish at 1.

Which starting number, under one million, produces the longest chain?

NOTE: Once the chain starts the terms are allowed to go above one million.
```

I think this problem is way easier than the last one. The premise here is that we are to compute the number of terms it takes to reach `1` for all the numbers between `1` and `1000000` for the function `collatz(n)`. `collatz(n)` is defined something like this:

```js
function collatz(n) {
  while (n > 1) {
    if (n & 1) { n = (3 * n) = 1; }
    else { n = n / 2; }
  }
  return n;
}
```

In my implementation I defined the following function:

```c
uint64_t collatz_terms(uint64_t value) {
  uint64_t r = 1;

  while (value > 1) {
    if (value & 1) { value = (3 * value) + 1; }
    else { value /= 2; }
    ++r;
  }

  return r;
}
```
In short what this does is start with `r` set to `1` term (this is the case for an input of `1` for instance) and then perform the `collatz(n)` function until we reach `1` incrementing `r` after each round. This alone is obviously not enough to figure out which number has the greatest number of terms. To do that we just need to have a simple "find the maximum of some set" code which looks like this:

```c
#include <stdio.h>
#include <stdint.h>

uint64_t collatz_terms(uint64_t value);

int main() {
  uint64_t max = 0,
           num = 0;

  for (uint64_t i = 1; tmp = 0; i < 1000000; ++i) {
    tmp = collatz_terms(i);
    if (tmp > max) {
      max = tmp;
      num = i;
    }
  }

  printf("%ld : %ld terms\n", num, max);
  return 0;
}

uint64_t collatz_terms(uint64_t value) {
  uint64_t r = 1;

  while (value > 1) {
    if (value & 1) { value = (3 * value) + 1; }
    else { value /= 2; }
    ++r;
  }

  return r;
}
```

The answer turns out to be `837799` which takes `525` terms to reduce to `1`.

Finally I've been working a lot on building a basic game engine. I tried, I really tried, to use [Godot](https://godotengine.org) or something else but I just hate everything. I'm a snob. Just yesterday I finally got something animate! The project is a **SUPER** work in progress right now so I'm not going to release any of the code here (I need to rewrite the code for a third time because I'm dumb). It's been really fun to go from nothing to something though.

<div class="center">
  <video class="frame" src="https://pi.megate.ch:25443/blog/media/birthday.mp4" controls="true" preload="true"></video>
</div>

Exactly what's going on is a bit complex. Underlying the entire output is a scene tree which holds each node in the scene. These nodes are drawn onto the screen based on a (currently badly designed) ordering. Right now there are about 52 things actually being drawn. The most obvious two are the text on the center of the screen and the framerate (which is an accurate calculation to my knowledge). The other 50 things are the field of stars behind the text. Each star is actually relying on the same texture (which is just an image of each frame of the star animation). Despite the out of control speed of the framerate the application is actually using a fixed update time of 60Hz. The screen is drawn as fast as possible regardless. Each star is also randomly placed so each time I run the application I get a new field of stars. This also helps me test that the stars are rendered behind the text.

Anyways I'm beat. I hope I can keep improving my graphics work. I know this stuff is really rudimentary but it's way ahead of what I could have done even a month ago. I'll try to write again sooner rather than later. Maybe next week unless it's a really boring week.

I'm still on my way to a smile but I think I'm getting there. I'm, as always, thinking of you wherever you are. 🙇‍ I hope things are alright out there.
<p class="center"><a href="/blog/posts/z.html">[permalink]</a></p></div>


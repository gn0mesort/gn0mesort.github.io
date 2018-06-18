---
title: firstexercises
style: /css/index.css
---

# First Exercises { .center }

You may recall that I said:

> What I'd really like to do is do at least 1 programming exercise a week as well as complete 1 concrete step toward making a small computer game each week.

I set up a couple of little exercises for this week. These are really simple but I wanted to start with something I could definitely do. In the future I think I might pick either an Euler problem or something else more complicated like that (maybe some code golf problems from Stack Overflow too).

The first problem I gave myself was the classic [FizzBuzz](https://en.wikipedia.org/wiki/Fizz_Buzz) program. This is a pretty simple exercise but apparently a lot of people fail it. The prompt is as follows:

> Write a program that prints the numbers from 1 to 100. But for multiples of three print "Fizz" instead of the number and for the multiples of five print "Buzz". For numbers which are multiples of both three and five print "FizzBuzz".

This simple to get done, and a little more complicated to get done in a nice way. A naive C++ approach would be:

```cpp
#include <cstddef>

#include <iostream>

int main() {
	for (size_t i = 1; i <= 100; ++i) {
		if (i % 15 == 0) { std::cout << "FizzBuzz"; }
		else if (i % 3 == 0) { std::cout << "Fizz"; }
		else if (i % 5 == 0) { std::cout << "Buzz"; }
		else { std::cout << i; }
		std::cout << std::endl;
	}
	return 0;
}
```

This version is pretty simple. For each number we check if it is evenly divisible by 15 (the product of 3 and 5), 3, and 5. If the number is divisible by any of those then we print the respective string. Otherwise we just print the number.

That about does it. You can nitpick here and there about my style (someone will definitely say, "Shouldn't it be `!(i % 3)` etc?") but if you just want it done this does it. Maybe we don't ***just*** want it done though. Maybe we want to be a little slicker. A slicker answer would look like this (again in C++):

```cpp
#include <cstddef>

#include <iostream>
#include <sstream>

int main() {
	for (size_t i = 1; i <= 100; ++i) {
		std::ostringstream ostr;
		if (i % 3 == 0) { ostr << "Fizz"; }
		if (i % 5 == 0) { ostr << "Buzz"; }
		if (ostr.str().empty()) { ostr << i; }
		std::cout << ostr.str() << std::endl;
	}
	return 0;
}
```

This version is a little more advanced. What we're doing is creating a `std::ostringstream` (a stream type that allows us to create strings from other data). Then we're inserting values into this stream based on whether or not the current number is divisble by 3 and 5. If the resulting string is empty after both checks we insert the number itself instead. Finally we insert our string into `stdout`.

Still pretty darn simple. In other languages (with fancier strings) this is even easier to do. I think we're forgetting something important though. C++ is for babies. So let's do it in C:

```c
#include <stddef.h>
#include <string.h>
#include <stdio.h>

int main() {
	for (size_t i = 1; i <= 100; ++i) {
		char result[9] = "";
		if (i % 3 == 0) { strncat(result, "Fizz", 4); }
		if (i % 5 == 0) { strncat(result, "Buzz", 4); }
		if (strlen(result) == 0) { snprintf(result, 8, "%d", i); }
		puts(result);
	}
	return 0;
}
```

Since this is C we have to use character arrays instead of string objects. We know that (in the worst case) we only have to print `"FizzBuzz\0"` hence the length of 9. Here we concatenate onto the string (called `result`) if the number is divisible by 3 or 5. If it isn't we print the number formated as a decimal value. Finally we print `result` on `stdout` with a newline added at the end. This version is also using the `n` variety of standard string functions (`strncat`, `snprintf`) which write at most `n` characters into our result. `n` here is 4 in the first two branches (where `i` was divisible by 3 or 5 or both) and 8 in the default case.

You can definitely get more hardcore than this. I've seen solutions that take over 400 lines. I don't see much point in that though. Ultimately this is a simple problem and trying to come up with an optimal solution is a bit silly.

The second exercise I did (because this is a neat trick and FizzBuzz is really easy) was to create a program that runs forever without any loops. This is also really easy but much harder to understand. So first a simple C (or C++ if you like) program that runs forever:

```c
int main() {
	while (1);
	return 0;
}
```

Another form of this that you might see is:

```c
int main() {
	for (;;);
	return 0;
}
```

For infinite loops I think that's as simple as it gets in C. I don't want any loops though. What I can do is this:

```c
int main() {
	return main();
}
```

Now, as you might guess if you know such things, this will not work normally. `main()` calls `main()` forever. The result is that at some point my program's call stack is going to explode and some manner of terrible cosmic horror will escape from my processor. Compiling this without any real thought looks like this:

```sh
$ gcc main.c
$ ./a.out
Segmentation fault (core dumped)
```

At least on my machine. In Windows you might get some other manner of error message. However, if we put a little thought in and compile it as follows it will run forever:

```sh
$ gcc -O3 main.c
$ ./a.out

```

The reason this works is that I've turned on optimization (with `-O3`). We can disassemble the executables to see why this actually works. In the unoptimized version `main()` looks like this (at least on my x86 processor):

```asm
00000000000005fa <main>:
 5fa:   55                      push   %rbp
 5fb:   48 89 e5                mov    %rsp,%rbp
 5fe:   b8 00 00 00 00          mov    $0x0,%eax
 603:   e8 f2 ff ff ff          callq  5fa <main>
 608:   5d                      pop    %rbp
 609:   c3                      retq   
 60a:   66 0f 1f 44 00 00       nopw   0x0(%rax,%rax,1)
```

The important line here is `callq 5fa <main>` which is telling the processor to save some information on the stack and then jump up to the address `0x5fa` which is the beginning of main again. We're also storing the value of `rbp` on the stack each time we do this. Eventually, when this has happened too many times, we run out of stack memory and the operating system tells us that we've done something wrong.

So what changes with optimzation? Well the optimized version of `main()` looks like this:

```asm
00000000000004f0 <main>:
 4f0:   eb fe                   jmp    4f0 <main>
 4f2:   66 2e 0f 1f 84 00 00    nopw   %cs:0x0(%rax,%rax,1)
 4f9:   00 00 00 
 4fc:   0f 1f 40 00             nopl   0x0(%rax)
```

The only line that really matters here is the first one `jmp 4f0 <main>`. The `jmp` instruction, unlike `call`, doesn't bother storing any return information on the stack. We also stopped storing the value of `rbp` (this happens to be the frame pointer) on the stack as well. So here all we're doing is jumping back to the address `0x4f0` which unsurprisingly is the address that starts `main()`.

This is called [tail call optimization](https://en.wikipedia.org/wiki/Tail_call). It works because we know that we don't have to save the state of any of our processor registers ahead of time. Normally when we call a function we have to save all the information about the previous function's state to the stack first. Otherwise when we return all of that information is lost (or at the very least extremely suspect because it may have been modified). Since a tail call occurs at the (tail) end of a function we don't need to worry about this though. The calling function is over. There are still some caveats to this (for instance what would happen if you passed a pointer to a stack local value from one recursive call to the next?) but if you just want an infinite loop this does the trick.

I don't know how concrete it is but I did also work on some game related stuff. It's just a little test of drawing and collisions. Given the results I need some practice. The collision check specifically doesn't work perfectly. The problem is likely obvious but I haven't debugged my hacky code.

## My hacky little SFML project (pls don't code like this irl) {.center }

```cpp
#include <SFML/Graphics.hpp>

bool collides(const sf::Sprite &character, const sf::Sprite border[32],
							const int direction) {
	for (size_t i = 0; i < 32; ++i) {
		if (character.getGlobalBounds().intersects(border[i].getGlobalBounds())) {
			if (direction == 0 &&
					border[i].getPosition().y <= character.getPosition().y) {
				return true;
			}
			if (direction == 1 &&
					border[i].getPosition().y > character.getPosition().y) {
				return true;
			}
			if (direction == 2 &&
					border[i].getPosition().x <= character.getPosition().x) {
				return true;
			}
			if (direction == 3 &&
					border[i].getPosition().x > character.getPosition().x) {
				return true;
			}
		}
	}
	return false;
}

int main() {
	sf::RenderWindow window(sf::VideoMode(256, 256), "Collision");
	sf::Texture edge, corner, background, actor;
	sf::Event ev;

	if (!background.loadFromFile("res/img/background.png")) {
		return EXIT_FAILURE;
	}
	if (!edge.loadFromFile("res/img/edge.png")) {
		return EXIT_FAILURE;
	}
	if (!corner.loadFromFile("res/img/corner.png")) {
		return EXIT_FAILURE;
	}
	if (!actor.loadFromFile("res/img/character.png")) {
		return EXIT_FAILURE;
	}

	sf::Sprite area[64], border[32], character(actor);

	for (size_t i = 0; i < 8; ++i) {
		for (size_t j = 0; j < 8; ++j) {
			area[i + 8 * j] = sf::Sprite(background);
			area[i + 8 * j].setPosition(i * 32, j * 32);
		}
	}
	for (size_t i = 0; i < 8; ++i) {
		if (i == 0) {
			border[i] = sf::Sprite(corner);
			border[i].setPosition(0, 0);
		}
		else if (i == 7) {
			border[i] = sf::Sprite(corner);
			border[i].setRotation(90);
			border[i].setPosition(256, 0);
		}
		else {
			border[i] = sf::Sprite(edge);
			border[i].setRotation(90);
			border[i].setPosition((i * 32) + 32, 0);
		}
	}
	for (size_t i = 0; i < 8; ++i) {
		size_t pos = i + 24;
		if (i == 0) {
			border[pos] = sf::Sprite(corner);
			border[pos].setPosition(0, 256);
			border[pos].setRotation(270);
		}
		else if (i == 7) {
			border[pos] = sf::Sprite(corner);
			border[pos].setPosition(256, 256);
			border[pos].setRotation(180);
		}
		else {
			border[pos] = sf::Sprite(edge);
			border[pos].setPosition(((pos - 24) * 32), 256);
			border[pos].setRotation(270);
		}
	}
	for (size_t i = 1; i < 7; ++i) {
		border[i + 8] = sf::Sprite(edge);
		border[i + 8].setPosition(0, i * 32);
	}
	for (size_t i = 1; i < 7; ++i) {
		border[i + 16] = sf::Sprite(edge);
		border[i + 16].setPosition(256, (i * 32) + 32);
		border[i + 16].setRotation(180);
	}
	character.setPosition(32, 32);

	while (window.isOpen()) {
		while (window.pollEvent(ev)) {
			if (ev.type == sf::Event::Closed) {
				window.close();
			}
			if (ev.type == sf::Event::KeyPressed) {
				sf::Vector2f pos = character.getPosition();
				if (ev.key.code == sf::Keyboard::Key::Up) {
					if (!collides(character, border, 0)) { character.move(0, -32); }
				}
				if (ev.key.code == sf::Keyboard::Key::Down) {
					if (!collides(character, border, 1)) { character.move(0, 32); }
				}
				if (ev.key.code == sf::Keyboard::Key::Left) {
					if (!collides(character, border, 2)) { character.move(-32, 0); }
				}
				if (ev.key.code == sf::Keyboard::Key::Right) {
					if (!collides(character, border, 3)) { character.move(32, 0); }
				}
			}
		}

		window.clear();

		for (size_t i = 0; i < 64; ++i) { window.draw(area[i]); }
		for (size_t i = 0; i < 32; ++i) { window.draw(border[i]); }
		window.draw(character);

		window.display();
	}
	return 0;
}
```

## Resources { .center }

<p class="center"><a href="https://pi.megate.ch:8443/blog/img/game/background.png"><img class="frame" src="https://pi.megate.ch:8443/blog/img/game/background.png" alt="background" title="background" /></a></p>

<p class="center"><a href="https://pi.megate.ch:8443/blog/img/game/edge.png"><img class="frame" src="https://pi.megate.ch:8443/blog/img/game/edge.png" alt="edge" title="edge" /></a></p>

<p class="center"><a href="https://pi.megate.ch:8443/blog/img/game/corner.png"><img class="frame" src="https://pi.megate.ch:8443/blog/img/game/corner.png" alt="corner" title="corner" /></a></p>

<p class="center"><a href="https://pi.megate.ch:8443/blog/img/game/character.png"><img class="frame" src="https://pi.megate.ch:8443/blog/img/game/character.png" alt="character" title="character" /></a></p>

The command I'm using to compile this is as follows:

```sh
$ g++ src/main.cpp -o collision `pkg-config --libs sfml-graphics`
```

Here are some screenshots of what it should look like:

<p class="center"><a href="https://pi.megate.ch:8443/blog/img/game/collision1.png"><img class="frame" src="https://pi.megate.ch:8443/blog/img/game/collision1.png" alt="collision1" title="collision1" /></a></p>

<p class="center"><a href="https://pi.megate.ch:8443/blog/img/game/collision2.png"><img class="frame" src="https://pi.megate.ch:8443/blog/img/game/collision2.png" alt="collision2" title="collision2" /></a></p>

It's obviously not much of a game but I've learned a bit about rendering 2D graphics and collision detection. It's safe to say that my collision detection algorithm (given above) simply won't cut it. In the future I want to try using collision masks to determine when two objects are in conflict. I'd also love to come up with a much better way of deciding which textures to render where. It would probably involve a much more complex object-oriented design.

So that was my week. I'll do my very best to post again by this time next week. Hopefully I'll have a better SFML project and also some more exciting challenges.

As usual,  I'm thinking of you, wherever you are 🙇 I hope you're alright out there!
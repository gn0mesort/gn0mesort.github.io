---
title: beenawhile
style: /css/index.css
---

# Been a While { .center }

It's been a while since I've written anything so I figured why not 😛

School is really time-consuming even when I don't think it's particularly difficult. I'd really rather be playing games all day, or making games all day but I spend a lot of time reading anthropology text books instead. It's not that anthropology doesn't interest me, it's that the only exciting part of the last few chapters was discovering the existence of [Oreopithecus bambolii](https://en.wikipedia.org/wiki/Oreopithecus) (most delicious of all extinct primates).

Other than kind of sort of studying anthropology, I've invested most of my non-video game related time into figuring out how to interact with LEDs using my Raspberry Pi. It's actually pretty easy, given the right supplies. Right now I have it set up with 4 RGB (Red, Green, Blue) LEDs and 220 Ohm resistors. I initially set it up with a single color LED (these came with the Raspberry Pi kit I bought) because that seemed less daunting (and less likely to lead to me being electrocuted). From there I set up a simple little RGB light with a button that changed its color. All of this was pretty simple to set up in C as well as ARM assembly (using wiringPi). As of today, I've set it up with a more impressive program that handles various patterns (no input yet though 😣) Here's the code for it:

## lightswitch.c
```c
#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>
#include <time.h>
#include <stdint.h>

#include <wiringPi.h>

#include "gpio.h"

void all_one_color(LED**, size_t);
void every_other(LED**, size_t);
void pulse(LED**, size_t);
void pulse_with_reflection(LED**, size_t);
void print_color(LEDCOLOR);

typedef void (*PATTERN)(LED**, size_t);

int main() {
	LED **leds = calloc(4, sizeof(LED));
	PATTERN pattern = pulse_with_reflection;

	srand((uint32_t) time(NULL));
	wiringPiSetup();
	leds[0] = make_led(27, 28, 29),
	leds[1] = make_led(11, 31, 26),
	leds[2] = make_led(4, 5, 10),
	leds[3] = make_led(15, 16, 1);

	while (true) {
		pattern(leds, 4);
		print_color(leds[0]->color);
		print_color(leds[1]->color);
		print_color(leds[2]->color);
		print_color(leds[3]->color);
		printf("\r");
		fflush(stdout);
		delay(200);
 }

	destroy_led(leds[0]);
	destroy_led(leds[1]);
	destroy_led(leds[2]);
	destroy_led(leds[3]);

	free(leds);

	return 0;
}

void all_one_color(LED **leds, size_t count) {
	LEDCOLOR color = (rand() % 0x7) + 1;
	for (size_t i = 0; i < count; ++i) { set_color(leds[i], color); }
}

void every_other(LED **leds, size_t count) {
	LEDCOLOR color = (rand() % 0x7) + 1, alt = ((color + 1) % 0x7) + 1;
	for (size_t i = 0; i < count; i += 2) {
		set_color(leds[i], color);
		set_color(leds[i + 1], alt);
	}
}

void pulse(LED **leds, size_t count) {
	static size_t i = 0;

	bool any = false;
	if(leds[i]->color != LED_OFF && i + 1 < count) {
		set_color(leds[i + 1], leds[i]->color);
		clear_color(leds[i]);
		any = true;
		++i;
	}
	else {
		clear_color(leds[i]);
		i = 0;
	}
	if (!any) { set_color(leds[0], (rand() % 0x7) + 1); }
}

void pulse_with_reflection(LED **leds, size_t count) {
	static size_t i = 0;
	static bool sign = true;

	if(leds[i]->color != LED_OFF) {
		if (sign && i + 1 < count) {
			set_color(leds[i + 1], leds[i]->color); 
			clear_color(leds[i]);
			++i;
		}
		else if (!sign && i - 1 < i) {
			set_color(leds[i - 1], leds[i]->color);
			clear_color(leds[i]);
			--i;
		}
		else {
			set_color(leds[i], (rand() % 0x7) + 1);
			sign = !sign;
		}
	}
	else {
		set_color(leds[i], (rand() % 0x7) + 1);
	}

}

void print_color(LEDCOLOR color) {
	switch (color) {
		case 0x0: { printf(" "); break; }
		case 0x1: { printf("B"); break; }
		case 0x2: { printf("G"); break; }
		case 0x3: { printf("C"); break; }
		case 0x4: { printf("R"); break; }
		case 0x5: { printf("M"); break; }
		case 0x6: { printf("Y"); break; }
		case 0x7: { printf("W"); break; }
		default: { printf("X"); }
	}
}
```

## gpio.h
```c
#ifndef GPIO_H
#define GPIO_H

#ifdef __cplusplus

#include <cstdint>

extern "C" {

#else

#include <stdint.h>

#endif

#include <wiringPi.h>

typedef enum {
	LED_OFF = 0x0,
	LED_BLUE = 0x1,
	LED_GREEN = 0x2,
	LED_CYAN = 0x3,
	LED_RED = 0x4,
	LED_MAGENTA = 0x5,
	LED_YELLOW = 0x6,
	LED_WHITE = 0x7
} LEDCOLOR;

typedef struct {
	LEDCOLOR color;
	uint8_t pins[3];
} LED;

typedef struct {
	uint8_t pin;
} BUTTON;

LED* make_led(uint8_t, uint8_t, uint8_t);
LED* set_color(LED*, LEDCOLOR);
LED* clear_color(LED*);
void destroy_led(LED*);

BUTTON* make_button(uint8_t);
bool read_button(BUTTON*);
void destroy_button(BUTTON*);

#ifdef __cplusplus

}

#endif

#endif /* GPIO_H */
```

## gpio.s
```armasm
.global make_led
.global set_color
.global clear_color
.global destroy_led
.global make_button
.global read_button
.global destroy_button

.section .text
.balign 4

.func make_led
make_led:
	push {v1, v2, v3, v4, lr} // Push registers
	mov v1, a1 // Set v1 to a1
	mov v2, a2 // Set v2 to a2
	mov v3, a3 // Set v3 to a3

	mov a1, #8 // Set a1 to 8
	bl malloc // Call malloc(8) (or malloc(sizeof(LED)))
	mov v4, a1 // Set v4 to a1

	mov a2, #0 // Set a2 to 0
	str a2, [v4] // Store a2 into v4
	strb v1, [v4, #4] // Store v1 into the byte at v4+4
	strb v2, [v4, #5] // Store v2 into the byte at v4+5
	strb v3, [v4, #6] // Store v3 into the byte at v4+6

	mov a1, v1 // Set a1 to v1
	mov a2, #1 // Set a2 to 1
	bl pinMode // Call pinMode(this->pins[0], OUTPUT)

	mov a1, v2 // Set a1 to v2
	mov a2, #1 // Set a2 to 1
	bl pinMode // Call pinMode(this->pins[1], OUTPUT)

	mov a1, v3 // Set a1 to v3
	mov a2, #1 // Set a2 to 1
	bl pinMode // Call pinMode(this->pins[2], OUTPUT)

	mov a1, v4 // Set a1 to v4
	pop {v1, v2, v3, v4, pc} // Return
.endfunc

.func set_color
set_color:
	push {a1, v1, v2, lr} // Push registers
	mov v1, a1 // Set v1 to a1
	mov v2, a2 // Set v2 to a2

	str a2, [v1] // Store a2 into v1

	ldrb a1, [v1, #4] // Load the value of v1+4 into a1
	and a2, v2, #4 // Set a2 to the 2nd bit of v2
	bl digitalWrite // Call digitalWrite(this->pins[0], this->color & 4)

	ldrb a1, [v1, #5] // Load the value of v1+5 into a1
	and a2, v2, #2 // Set a2 to the 1st bit of v2
	bl digitalWrite // Call digitalWrite(this->pins[1], this->color & 2)

	ldrb a1, [v1, #6] // Load the value of v1+6 into a1
	and a2, v2, #1 // Set a2 to the 0th bit of v2
	bl digitalWrite // Call digitalWrite(this->pins[2], this->color & 1)

	pop {a1, v1, v2, pc} // Return
.endfunc

.func clear_color
clear_color:
	push {lr} // Push registers

	mov a2, #0 // Set a2 to 0
	bl set_color // Call set_color(a1, LED_OFF)

	pop {pc} // Return
.endfunc

.func destroy_led
destroy_led:
	push {lr} // Push registers

	bl clear_color // Call clear_color(this) to turn off LED
	bl free // Call free(this)

	pop {pc} // Return
.endfunc

.func make_button
make_button:
	push {v1, lr} // Push registers
	mov v1, a1 // Set v1 to a1

	mov a2, #0 // Set a2 to 0
	bl pinMode // Call pinMode(a1, INPUT)

	mov a1, v1 // Set a1 to v1
	mov a2, #2 // Set a2 to 2
	bl pullUpDnControl // Call pullUpDnControl(a1, PUD_UP)

	mov a1, #4 // Set a1 to 4
	bl malloc // Call malloc(4)
	strb v1, [a1] // Store v1 into the first byte at a1

	pop {v1, pc} // Return
.endfunc

.func read_button
read_button:
	push {lr} // Push registers

	ldrb a1, [a1] // Load the value of a1 into a1
	bl digitalRead // Call digitalRead(this->pin)

	pop {pc} // Return
.endfunc

.func destroy_button
destroy_button:
	push {v1, lr} // Push registers
	mov v1, a1 // Set v1 to a1

	ldrb a1, [a1] // Load the value of a1 into a1
	mov a2, #0 // Set a2 to 0
	bl pullUpDnControl // Call pullUpDnControl(this->pin, PUD_OFF)

	mov a1, v1 // Set a1 to v1
	bl free // call free(this)

	pop {v1, pc} // Return
.endfunc
```

The code might seem like gibberish so here are a few pictures and a video of it running the hardware before I explain.

<p class="center"><a href="https://pi.megate.ch:8443/blog/img/gpio_1.jpg"><img class="frame" src="https://pi.megate.ch:8443/blog/img/gpio_1_small.jpg" alt="Image 1" title="Image 1" /></a></p>

<p class="center"><a href="https://pi.megate.ch:8443/blog/img/gpio_2.jpg"><img class="frame" src="https://pi.megate.ch:8443/blog/img/gpio_2_small.jpg" alt="Image 2" title="Image 2" /></a></p>

<p class="center"><a href="https://pi.megate.ch:8443/blog/img/gpio_3.jpg"><img class="frame" src="https://pi.megate.ch:8443/blog/img/gpio_3_small.jpg" alt="Image 3" title="Image 3" /></a></p>

<div class="center">
<iframe class="frame" src="https://www.youtube-nocookie.com/embed/zQsaso_rD4s?rel=0" allowfullscreen="" style="max-width: 100%;max-height: 100%;" width="1280" height="720" frameborder="0"></iframe>
</div>

So what's all this stuff up to? The code is broken up into three parts. First, and obviously most important is `lightswitch.c`. It's a little C program that controls the hardware for me and implements all of my different patterns (the video only shows pulse with reflection). It's mostly just creating an array of 4 `LED`s and manipulating them using functions found in `gpio.h`. `gpio.h` for its part describes all the fancy hardware stuff. It describes the `LED` structure that I'm using as well as a `BUTTON` structure that I haven't gotten around to yet. Finally `gpio.s` does all the work for `gpio.h`. It's written in ARM assembly, not because I particularly wanted it to be but, because I plan to use it in a school project.

Although it's a bit tangential to the actual project I'm doing for school, I might develop `lightswitch.c` and pals a little more. Mostly just because it's fun (pretty much anything with blinky LEDs is fun). I'd certainly like to make it accept input across the buttons I have wired up. It would be neat to be able to cycle both patterns and methods of picking colors (for now all the patterns use random colors).

Anyways that's what I'm up to (well that and playing the new .hack//G.U. rerelease). I hope that wherever and whenever you are you're doing well. Good luck out there! 🙇🏻
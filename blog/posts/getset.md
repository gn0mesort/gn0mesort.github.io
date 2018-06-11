---
title: getset
style: /css/index.css
---

# Get, Set { .center }

It has been a long time since I've written anything (since November in fact). This is my third draft for this post. 2017 was a hard year for me in many ways (it was also one of the years I think I will remember the most). I, initially, didn't want to post anything because I had nothing to show off. With the exception of my final project for my ARM assembly programming class I haven't been doing much besides sulking. The winter, maybe just because it's winter, has been depressing. The reasons are probably obvious. Coping with the last year has been hard and it's not something I've fully figured out yet.

My only real response to it has been this consistent feeling that I need to do something. Not something drastic like setting a car on fire or hiring a sky writer. What I'd really like to do is make a video game and not just another little text thing. I've toyed with a whole bunch of ideas, almost since the end of August. My initial idea was to just go with something super simple. I'm still kind of stuck with that because I don't have the resources or the patience to do anything fancy. What I decided on, back in August, was a little text adventure game written in JavaScript. I neither enjoy JavaScript nor text adventures so that was probably a bad idea. It was going to be about a penguin detective (which coincidentally is a recurring thing in [Paper Mario: The Thousand-Year Door](https://en.wikipedia.org/wiki/Paper_Mario:_The_Thousand-Year_Door)). This obviously didn't pan out. Classes and just the level at which I hate JavaScript prevented me from pursuing it. My next idea perhaps too ambitious was to stick with the roguelike concept I used in a school project and expand it out into a graphical game. I think I got pretty out of hand with ideas to add to it. Ultimately I've tried to settle on the idea of doing a more limited roguelike design. Maybe something a bit more like [Mystery Dungeon](https://en.wikipedia.org/wiki/Mystery_Dungeon).

Regardless of what I end up doing, I feel like if I can complete something worthwhile that it's some form of penance. I think this is a habit I've gotten into over the last year or two. Thinking that if I can just *do something* it will make things better. Really, I'm not sure if working on a project like this will make me feel any better at all. I'm more committed to it than I was at the start of the winter though. I thought I could buckle down and get it done over the break but I ended up reading a lot of software design stuff instead (and sulking as I mentioned).

Of what I read, [Why getter and setter methods are evil](https://www.javaworld.com/article/2073723/core-java/why-getter-and-setter-methods-are-evil.html) is probably the most interesting. I learned Java in 2010 at UC Merced (Java being the most appropriate language to program in while living in Merced, California). After the two mandatory Java courses (CSE 20 and 21 if I recall correctly) I took a class on data structures which focused on C++. That C++ class was, probably, one the factors that motivated me to drop out of school. It was slow, taught late at night, and filled with people I resented. My most irritating memory of the class was the final exam review. The course had covered basic C++ syntax (surprise it's 75% the same as Java) and basic data structures (lists, stacks, queues, trees, and graphs). During our review we were tasked with determining what the following code did:

```cpp
for (int i = 0; i < 100; i++) {
  cout << i + 1 << endl;
}
```

For the initiated, it's probably obvious why spending an entire 2 hour lecture period having this explained to me in meticulous detail would set me off. For the uninitiated, all it does is print the sequence of integers `1` to `100` (each on their own line) to wherever the program's standard output stream is going (in this case the Eclipse terminal). I really couldn't stand being in that kind of environment and I dropped out not too long afterwards. I also gave up on programming in C++. Between then and now, I also picked up C#. Although I feel like I end up programming in JavaScript, C++, or C most of the time, C# is still my favorite language. I picked C++ back up in 2015. I can't remember the last time I've wrote anything in Java.

The reason I included that long history is because, as a lover of C# and a hater of Java, I have somewhat conflicting opinions about its conclusions. C# is **full** of getter (accessor) and setter (mutator) methods. The thing is that they take a little bit of a sneaky form. In C# getter and setter methods get hidden inside of a `property` (which is distinct from a `class` scoped variable or `field`). C# properties are what I would describe as comfy. In C# it's common practice to make every public value a property even when there is no get or set logic (as far as I know this is even recommended). It ends up looking something like this:

```cs
public class Foo {
  private int bar = 0;

  public int Bar {
    get { return bar; }
    set {
      if (value < 10) { bar = 10; }
      else { bar = value; }
    }
  }
}
```

Rather than having to invoke `Foo.getBar()` or perhaps `Foo.Bar.get()` `Foo.Bar` is treated as a value. This is extra comfy (perhaps too comfy for our own good). You can't get this level of comfort in C++ (although you can get damn close with operator overloads) and in Java you're stuck with gunky getter and setter methods like it or not (I've learned from my winter reading that Java programmers consider this to be less ambiguous). As comfortable as it is to just stick properties everywhere, there are some things I think are dangerous about them. Maybe even more dangerous than Java's obvious getters and setters. For instance we can get away with this:

```cs
public class Foo {
  private int bar = 0;

  public int Bar {
    get { return bar; }
    set {
      if (value == 1) { bar = value; }
      else {
        Bar = (value & 1) == 1 ? (3 * value) + 1 : value >> 1;
      }
    }
  }
}
```

This allows you to recursively calculate the [Collatz conjecture](https://en.wikipedia.org/wiki/Collatz_conjecture) for the input `value` any time we set `Foo.Bar`. It wouldn't be a big deal if a function in C or C++ did this by itself (especially if it's appropriately named something like `collatz()`). It wouldn't be a big deal if a `static` method in Java or C# did this. The danger in the above code is that C#'s comfy property syntax might convince an unwary programmer that `Foo.Bar` (or even a more appropriately named class and property) was a value and not a recursive method. This was enough to cause some serious run-times:

```cs
public static void Main (string[] args) {
  Foo f = new Foo();

  for (int i = 0; i < 100000000; ++i) { f.Bar = 0xffffff; }
}
```

Obviously that scenario is a bit silly but if you compare it to the behavior of a default getter and setter the performance difference is significant. By sneaking complex method-like behavior into properties we can introduce run-time costs that another programmer might not expect. This is evil (or maybe just considered harmful).

I still really like properties though. Maybe I just *want* to like properties. My perspective is that properties are good when you want to have some control that only makes sense in the context of the current object (and maybe derived objects). If the control makes sense in many contexts it might be better to just define a new type. That's my perspective at least.

Overall I think focusing on the ability to write ambiguous code with properties is unfair. We can definitely do evil things with it. We can do evil things with methods too though. The previous example could just as easily be crammed into a method called `Foo.SetBar()` and it would still be evil. Maybe slightly less evil because there's no chance you'll confuse `Foo.SetBar()` with a value. I've seen a good amount of criticism of operator overloads for this reason too. I just can't get over the feeling that complaints about ambiguity are mostly coming from the kind of people who think we should all write everything the same way (the way that's easiest for me to understand clearly).

I suppose the winter was productive. Not really in the way I would have liked but I did learn a lot.

Back in December, right after my classes ended, I really wanted to vent about school. Obviously I didn't then but I'm going to now.

I'm almost done with actual Computer Science classes at this point (after this upcoming semester I have a required class on operating systems left). After that I'll have to take a very fun and exciting course on how to copy text from a web browser to a Microsoft Word document (the idea of teaching people Microsoft Office makes me cringe). The classes I took last semester could probably best be described as `alright`. JavaScript was by far the worst class. I thought it would be pretty easy (because once you've taken one intro course you've kind of taken them all) and it was. It was an odd class. The teaching I would describe as lazy at best. Almost all of our assignments involved copying directly out of the book. This has got to be the absolute worst kind of programming assignment. For some reason intro books sometimes have these long `project` style assignments that are mostly just line by line copying of some source code out of the book. To add to the special punishment that is copying out of a book, the code is spread out on 30 or so pages with cute little pictures to keep you engaged. I found the book ([Head First JavaScript Programming](http://shop.oreilly.com/product/0636920027065.do)) to be a bit condescending over all. I really don't need a bunch of public domain photos and bad jokes to understand what a variable is. The instructor (who was not a PhD and therefore not a professor) made it considerably worse.

I'm kind of a C guy (or at least I think of myself as one). I like C and I like C++ (as much as anyone can) too. I, as I've mentioned, especially like C#. I know that people think C and C++ are hard. I know that manual memory management can be difficult to keep up with. Whenever I hear someone say, "C++ doesn't have arrays like in JavaScript," I start to lose my patience though. If you really want to have an array that can grow or shrink to fit your needs you have `std::vector`. Not knowing C++ isn't really an excuse for parading JavaScript around as the perfect programming language. It's not that JavaScript is all bad (it has those properties I like so much from C#) but it's kind of terrible for a teacher to present it as the easy language that you should learn instead of some crusty old thing like C++.

Besides not appreciating the instructor's jabs at languages I like, I also found it unappealing that he complained (fairly often) about wanting to be in other professions. If you don't like programming, and want to be an actor go do it. "I'd rather be an actor or a chef," is not what I want to hear from a person whose job it is to teach me a professional skill outside of those fields. Can you imagine going to medical school and on the first day of class the instructor tells you, "I'd really rather have been a secretary than a doctor." To top the experience off he also wrote a final exam that, frankly, had some questions that were not did not make sense in the context of JavaScript. For instance asking:

```txt
What does this return?
```

```js
if ([]) {
  // code here
}
```

doesn't make any sense. A conditional like that in JavaScript doesn't return anything on its own. It might have a return statement in it, or some number of statements like `x = 10;` that do return something. `if (condition)` doesn't return though. You can't set something equal to a conditional statement like that either. You're welcome to test it. For what it's worth the intention of the question was probably to ask whether or not the code in the conditional statement would execute. In the case of `if ([])` the answer is yes. You can also test this out.

I have to draw the line somewhere for when a class is bad. If your final exam contains questions that show you lack a proper understanding of the subject matter as an instructor, your class is bad.

My only other observation about JavaScript was that a lot of people dropped the class. I'd say about as many people as had dropped my intro to C++ course just when I'd started to go back to school. It surprised me. I thought if people were going to drop a class it would have been the ARM assembly course I took instead.

So it's been a bit of a hard winter. I feel like even though I didn't get done what I wanted to I'm better prepared to do it. For the spring I'm going to be taking a Java class for the first time in like 7 years (holy crap). I'm not thrilled about taking Java over C++ but I feel like it will help me have a broader skill set and the only C++ class I could take this time around was on data structures. I'd really rather take a class on SQL or PHP but neither of them would count for anything. I'm also going to be taking a drawing class so maybe I'll scan whatever I end up doing and post it.

I hope you're doing alright out there. I'm thinking of you, wherever you are. 🙇‍

P.S. I'll try to write more often. Sometimes I set deadlines for myself and then when I miss them I get super avoidant. That's what happened in December.
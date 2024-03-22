---
title: Standard C++ Tic-Tac-Toe
subtitle: ""
subtitleattribution: ""
subtitlework: ""
description: "What does a standard C++ game look like?"
date: 2024-03-16T09:32:06-07:00
publishdate: 2024-03-21
keywords:
    - c++20
    - tic-tac-toe
    - c++
    - project
    - log
summary: "What does it take to write a game in standard C++?"
toc: true
backrefs: true
highlighter: false
showdates: true
---

## Introduction

Early in 2016, I really started to pick up <span class="nowrap">C++</span>. I was taking an introductory level city
college course that was a little too easy for me because I had taken a similar course several years prior. It was
pretty standard, in my opinion, for a basic computer programming course. Most of the assignments involved writing
[toy applications](/code/toy_sorter/), which is something I've always hated doing. On the other hand, I was also
assigned a project for the duration of the course, which I ended up greatly enjoying. Essentially, the project was to
be a demonstration of the course's material. The project would be graded twice, once at the half-way mark of the 
course alongside the midterm exam and once again at the end of the course. More importantly, the project needed to be
creative and impressive. It wasn't a requirement, but the professor's expectation was that each student would write a
game in more or less standard <span class="nowrap">C++</span> (e.g., <span class="nowrap">C++11</span> or
<span class="nowrap">C++14</span> at the time).

Technically the professor allocated the entire duration of the course to the project. However, the reality was that I
had closer to two weeks to develop each version. Two weeks were available to develop the first version in time for the
midterm exam. Two more weeks were available to improve it in time for the final. Despite being pulled in many
directions at the time, I found the experience of writing a whole game that quickly enjoyable. The result is a small
[hangman game with some RPG styling on top](https://github.com/gn0mesort/RothmanAlexander_CSC5_41202/tree/master/Projects/Project%202/Desperado_V1).
I think I was being a bit conservative about what I could and couldn't do in the available time, so I wasn't
especially satisfied with the result.

Luckily, I ended up taking another <span class="nowrap">C++</span> course with the same professor that fall. Once
again, I got to write a game in about four weeks total. For the second game, I ended up writing a simplistic roguelike.
I called it
[Overflow](https://github.com/gn0mesort/RothmanAlexander_CSC17A_48096/tree/master/proj/Project_2/Overflow_2) and,
somewhat embarrassingly, I'm still fairly proud of it. After completing it though, I never really revisited the idea.

In December of last year, I started to think about these little game projects again. Unlike the games I wrote in the
past though, I wanted to really consider what a game written in only standard <span class="nowrap">C++</span> (i.e.,
<span class="nowrap">C++20</span>) would look like. To
keep things simple, I decided to implement [Tic-Tac-Toe](https://github.com/gn0mesort/ttt). Besides being simple to
implement, my hope is that anyone else who is interested in writing these kinds of games can use the source code as an
example.

## The Problem

When I sat down to actually implement this game the first thing I considered was what I absolutely needed. The common
types of computer games (i.e., games written for hardware 3D APIs and graphical user interface systems) have a whole
variety of tools at their disposal that aren't available in any version of the <span class="nowrap">C++</span>
standard. The most problematic deficiencies are the lack of any interactive input and a lack of any inter-process
communication.

In general, computer games are basically looping programs that read input from one set of devices and write output to
another. Once per loop iteration, the program reads its input, integrates the input into its state, and writes output.
These games are interactive because the devices they read input from and write output to are handled separately from
the game loop itself. That is to say, the game can begin its next loop before the user has actually seen the output,
and it can continue even when there is no input at all.

Unfortunately, <span class="nowrap">C++20</span> lacks any concept of this type of interactivity. The closest that
you can get, as far as I know, is to rely upon a hosted environment connecting standard input to an interactive
terminal. If it does, then you can rely on reads blocking until a user writes input into the terminal, and you can
rely on never reaching an end-of-file state. This is basically what Overflow and other student applications do. It's
doubly unfortunate then that this can't be relied upon either. If standard input is not an interactive terminal then
there's no reliable way to receive input interactively. As I understand it, there's no standard way to detect this
behavior either.

To make things more difficult, there's no standard way to send messages to other processes or receive responses.
<span class="nowrap">C++20</span> has plenty of ways to do this within a single process (e.g.,
[`std::raise`](https://en.cppreference.com/w/cpp/utility/program/raise) or
[`std::binary_semaphore`](https://en.cppreference.com/w/cpp/thread/counting_semaphore)) but no way to communicate
outside without extensions to the standard library. This effectively rules out most naive strategies for
interactivity, but it also causes another problem.

Since there's no standard way to communicate between processes its impossible for a standard
<span class="nowrap">C++</span> program to synchronize access to resources that it might require. For example, if a
user spawned two or more instances of a game process, they might end up corrupting any files that the processes write
to. In a non-standard setting multiple instances of a single program could communicate and decide how to handle this
issue. A standard program needs to find its own solution though.

## The Solution

For my implementation of Tic-Tac-Toe, I ended up solving both problems by leveraging the standard I/O library and the
standard file system library. Instead of relying on a single looping process, my implementation is actually four
separate applications. Each application reads, potentially modifies, and writes a shared data file. Of course, issues
would still arise if multiple applications could access the data file at the same time. To synchronize access to the
shared data file, my implementation provides a
[`lockfile`](https://github.com/gn0mesort/ttt/blob/master/include/megatech/ttt/details/lockfile.hpp) type using only
standard components.

Although it requires some finesse, controlling file access is possible using <span class="nowrap">C++20</span>. The
way it works is that an application passes each `lockfile` object a
[`std::filesystem::path`](https://en.cppreference.com/w/cpp/filesystem/path) that addresses the file to lock. During 
the locking procedure, the `lockfile` attempts to create another file by prepending `".~lock"` to the file name. To do
this, the `lockfile` object calls [`std::fopen`](https://en.cppreference.com/w/cpp/io/c/fopen) with the special `"wx"`
mode. This mode ensures that `std::fopen` only creates a new file if a file with the same name doesn't exist.
Unfortunately, the equivalent behavior for [`std::fstream`](https://en.cppreference.com/w/cpp/io/basic_fstream)
isn't available until <span class="nowrap">C++23</span>. The `lockfile` then stores the resulting pointer. This
procedure fails if the `lockfile` already owns a pointer or if the call to `std::fopen` fails. As long as the
applications used to implement the game obey these locks then they can effectively synchronize file access.

To make the game interactive, each application accesses a single binary file. This file, which is described in detail
in the [`README`](https://github.com/gn0mesort/ttt/blob/master/README.md), is 17 bytes long and contains the entire
state of a Tic-Tac-Toe game. Actually, the game state only requires 22 bits. The rest of the file is metadata. The
applications are completely serial programs that implement one major game function each. To play interactively then,
a player executes a sequence of programs. First, he or she creates a game by executing
[`ttt-new-game`](https://github.com/gn0mesort/ttt/blob/master/src/new_game.cpp). Next, he or she executes
[`ttt-take-turn`](https://github.com/gn0mesort/ttt/blob/master/src/take_turn.cpp) to take a turn. In the single player
mode, `ttt-take-turn` will also handle the computer player's turn. In the multiplayer mode, the second player needs to
invoke `ttt-take-turn` with his or her selection. Finally, the player can delete the game data by executing
[`ttt-delete-game`](https://github.com/gn0mesort/ttt/blob/master/src/delete_game.cpp). The fourth application,
[`ttt-display-game`](https://github.com/gn0mesort/ttt/blob/master/src/display_game.cpp), will output the current game
state on command without modifying it.

Of the four applications, only two applications expect any user input. The applications handle user input through
program arguments passed to `main()` (i.e., values stored in `argv`). `ttt-new-game` accepts a game mode which is
completely optional. On the other hand, `ttt-take-turn` requires the user to provide the column and row index of a
location on the game board that he or she wants to mark.

## Thoughts

I'm more or less content with the resulting approach to standard <span class="nowrap">C++</span> games. Obviously,
Tic-Tac-Toe is the least exciting game imaginable, but I think the approach could be extended to much more complex
games. Eventually, I'd like to try another roguelike or some other kind of role-playing game written this way.
My solution, in particular, suffers from the lack of any advanced argument parsing functionality. That's a conscious
choice on my part. If I had a module similar to the GNU
[`getopt_long`](https://www.gnu.org/software/libc/manual/html_node/Getopt-Long-Options.html) available then I would
have wrapped the entire game in a single application. The implementation of `getopt_long` doesn't require any
nonstandard functionality, but I felt it was beyond the scope of a Tic-Tac-Toe game. For a more complex game, I think
argument parsing is an absolute requirement.

Another deficiency is the `lockfile` mechanism. Unfortunately, I don't think there's a fix for this that only requires
standard <span class="nowrap">C++</span> code. The `lockfile` implementation is sufficient if every process on a
system obeys it, but that's not much of a guarantee. It also exhibits all the fun problems that the POSIX
[`openat()`](https://pubs.opengroup.org/onlinepubs/9699919799/functions/open.html) function resolves. Actually, being
able to use the POSIX interface makes implementing text-mode games much simpler.

Right now, I think the next step for me will be something more complex. This project was a fun exercise, but I want to
keep busy for a longer period of time. It's tempting to jump back to doing something with
[OpenGL](https://www.opengl.org/) or [Vulkan](https://www.vulkan.org/). On the other hand, a game with a better
text-mode interface feels like a more logical next step. In any case, whatever I do next will be more interesting to
me than Tic-Tac-Toe.

By the way, there are a couple of secrets included in this game. For a while now, I've been lingering on what
William Gibson says about cyberspace in *Neuromancer*. Which is to say that cyberspace is a consensual hallucination.
Lately, I feel too many games try to be wholly realistic. I think the best games are a bit dream-like. They should
have a quality, separate from any design, that is just slightly unreal. Clocks should have five hands. People should
speak in a way that sounds like a language but isn't one. The same road should sometimes lead to different locations.
In a dream, things are just coherent enough to tell the story and no more coherent than that. Anyway, this is all to
say that I think it's important for games to have their own curious little behaviors. A good game always needs a
secret or two.

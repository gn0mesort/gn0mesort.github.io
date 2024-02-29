---
title: Godot 3.x Patch for Doomsday Paradise
subtitle: ""
subtitleattribution: ""
subtitlework: ""
description: "CJK line breaking patch."
date: 2024-02-06T13:08:48-08:00
publishdate: 2024-02-28
toc: true
keywords:
    - doomsday paradise
    - godot
    - c++
    - project
    - log
summary: "An overview of a patch to fix CJK word wrapping in Godot 3.5."
backrefs: true
highlighter: false
showdates: true
---

## Introduction

Last summer (the summer of 2023), I was contracted by [Lemonade Flashbang](https://www.lemonadeflashbang.com/) to
write a patch for the [Godot](https://godotengine.org/) game engine. The patch fixes text display issues in the
simplified Chinese, traditional Chinese, and Japanese localizations of
[Doomsday Paradise](https://store.steampowered.com/app/1603420/Doomsday_Paradise/). By patching Godot, Lemonade
Flashbang could present its game at [Bitsummit](https://bitsummit.org/en/) last July and launch it on
[Steam](https://store.steampowered.com/) last November.

## The Problem

Before version 4.0, Godot produced inappropriate line-breaking behavior for CJK text. The inappropriate behavior was
observable using both the [`Label`](https://docs.godotengine.org/en/3.5/classes/class_label.html) and
[`RichTextLabel`](https://docs.godotengine.org/en/3.5/classes/class_richtextlabel.html) nodes. Unfortunately, in 
Godot 3.x, automatic line-breaking is handled differently in `Label` and `RichTextLabel` nodes. Each node requires a
separate solution (or a large-scale change to its functionality, such as the changes included in 4.0). `Label` nodes
break the entire text into a linked list of separable strings. When inserting more text into the list would overflow a
line, Godot inserts a specialized
[`WRAPLINE`](https://github.com/gn0mesort/godot/blob/3.5-stable/scene/gui/label.h#L72) element. `RichTextLabel` nodes,
on the other hand, use a more complex approach. A Godot 3.x `RichTextLabel` node contains a linked list of
[`RichTextLabel::Item`](https://github.com/gn0mesort/godot/blob/3.5-stable/scene/gui/rich_text_label.h#L112) objects.
Each `Item` represents a formatted segment of the `RichTextLabel` node's content. However, not all of the content of a
`RichTextLabel` needs to be text. The result is that each `Item` may represent the entire text (the simplest case), a
portion of the text, or no text at all. When automatically inserting line breaks into a `RichTextLabel`, Godot 3.x
only considers whether or not the text in the current `Item` would overflow the current line. This approach works fine
for English text but is a source of many errors for languages using CJK characters.

To make matters more complex, Godot 3.x's source code exhibits some common issues often found in lower-quality
<span class="nowrap">C++</span> source code. In both `Label` and `RichTextLabel` nodes, the method that handles the
automatic line-breaking process is quite long.
[`RichTextLabel::_process_line`](https://github.com/gn0mesort/godot/blob/3.5-stable/scene/gui/rich_text_label.cpp#L143)
(the method responsible for automatic line-breaking in `RichTextLabel` nodes) is over 700 lines long.
`RichTextLabel::_process_line` (the primary offender) also includes several extensive macro definitions. These macros,
such as [`NEW_LINE`](https://github.com/gn0mesort/godot/blob/3.5-stable/scene/gui/rich_text_label.cpp#L211), reduce
the size and redundancy of an already giant method implementation. However, they also defy convenient debugging with
my debugger ([GDB](https://www.gnu.org/software/gdb/)). As a result, I had to trace these sections by hand when
necessary. The source code also contains many short (often one or two-character) symbol names. There's a lot of
<span class="nowrap">C++</span> source code with inappropriately vague symbol names, so this isn't a shocker. Just
like everything else I've mentioned, though, this makes the source code more difficult to read and, ultimately, to
debug.

## The Solution

To solve these problems, [the patched version of Godot](https://github.com/gn0mesort/godot/tree/3.5)
had to change both the `Label` and `RichTextLabel` nodes. The core of both nodes' new CJK line-breaking functionality
is the [`gnomesort::is_cjk_x_char`](https://github.com/gn0mesort/godot/blob/3.5/scene/gui/gs_cjk.h) family of
functions. These functions provide a modular way for Godot scene nodes to classify CJK text. This functionality
includes simple detection (i.e., is the text CJK or not), detection of whether or not a character may end a line,
detection of whether or not a character may begin a line, and detection of whether or not a character is separable
from its neighbors.

The separability question is particularly complex because it requires analyzing the characters before and after the
current character (if they exist). Determining separability is no big deal for `Label` nodes because they always hold
their entire text. `RichTextLabel` nodes are another story. For `RichTextLabel` nodes, Godot needs to traverse the
internal `Item` list. Besides the additional complexity of linked list traversal, which is minimal, `RichTextLabel`
nodes require analyzing several characters ahead of the current character to determine the locations of safe breaking
points. This extra complexity is owed, in no small part, to the generally messier way that `RichTextLabel` nodes are
processed. Even with additional context, there are still cases where `RichTextLabel` nodes can produce incorrect
results.

The final major issue arises when a `RichTextLabel` mixes CJK text with Latin text. For example, this can occur when
text is written in Japanese but switches to Latin characters for a name (likely from user input). Initially, I chose
to detect which rules applied to a given text `Item` within a `RichTextLabel` by scanning the `Item` entirely. This
strategy often works because the entire segment should use the CJK rules if there is CJK text. Problems arise when a
switch occurs across a formatting boundary. This issue can occur when text, like the name in the previous example, is
colored or has some other special formatting (e.g., bold, italics, underlining, etc.). In the name of expediency, I
ultimately chose to implement a toggleable setting that controls whether a `RichTextLabel` should apply the CJK rules
to all text.

## Thoughts

At the end of the day, I stand by the admittedly expedient solution I arrived at. It's rougher around the edges than I
would like, but that kept time and costs to a minimum. Better solutions exist; switching to Godot 4.0 and relying on
[`TextServer`](https://docs.godotengine.org/en/stable/classes/class_textserver.html) is the most obvious example, but
it wouldn't have been the correct answer for the client. Still, the time-constrained nature of these types of
contracts frustrates my perfectionist tendencies.

Besides that, I wonder how using a framework like Godot impacts the economics of a project like Doomsday Paradise. The
simple analysis says it saves time and money, but this project indicates that the simple analysis of large software
frameworks is only sometimes correct. Other times, when the framework doesn't cover all of a developer's needs
perfectly, developers will have to expend resources on workarounds. How often is that the case, and how much do these
workarounds cost? Unfortunately, I don't have an answer, and I haven't been able to find much rigorous data on the
subject. My intuition is that the costs will likely be higher than they initially seem. 

The only way for me to find out is to pursue more of this type of work in the future. Working with Lemonade Flashbang
was my first experience with a commercial game project. It felt like a big step for me despite my relatively small
contribution. Before this, I had tried to work on a few of what I would describe as amateur game projects.
Unfortunately, those never really went anywhere. I still want to try for more amateur projects. However, I enjoyed
getting into Godot's guts, and I know amateurs tend to flee the moment anyone mentions <span class="nowrap">C++</span>.
Either way, I'd like to take on more work like this sooner than later.

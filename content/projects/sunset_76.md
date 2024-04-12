---
title: Sunset 76
subtitle: ""
subtitleattribution: ""
subtitlework: ""
description: "Building a small business web site."
keywords:
    - html
    - css
    - web
    - project
    - log
summary: "Building a small business web site."
date: 2024-04-11T00:56:45-07:00
publishdate: 2024-04-11
toc: true
backrefs: true
highlighter: false
showdates: true
draft: true
nolist: false
---

## Introduction

In January, a friend of mine approached me about creating a web page for his small business. The business,
[Sunset 76](https://sunset76.com), had a domain name and some kind of shared web hosting package, but the previous
operator had essentially abandoned it. The result was
[a largely blank page with some blurry JPEG images](/img/sunset_76_original_desktop.png)
([mobile](/img/sunset_76_original_mobile.png)) that reflected poorly on Sunset 76.

I'm not a huge web guy, but I agreed to help. After all, the needs of a small business generally don't involve vast
web applications or services. Really, the only thing the business required was a single static web page answering its
customer's most common questions.

## The Problem

Basically, there were two problems involved in building a web page for Sunset 76. First, I needed to write the page
itself, write the stylesheet, and create any images that the page required. Second, I needed to wrangle the hosting
service, [Turbify](https://www.turbify.com/), and convince it to display the page rather than one made through its
builder.

Sunset 76's new page needed to meet only the most basic requirement. It needed to look more or less professional. That
meant [no blurry JPEG images](/img/sunset_76_new_desktop.png) and a
[responsive layout that would look presentable across devices](/img/sunset_76_new_mobile.png). Additionally, I needed
to acquire any resource files myself.

Handling Turbify shouldn't have been an issue. Uploading a file to a web server and configuring it to serve that same
file should be easy. Unfortunately, Turbify's web interface has some issues. At least on my end, pages that should
exist don't (e.g., their [cPanel](https://www.cpanel.net/) interface is intermittently inaccessible), links in 
documentation go to missing pages, and there's no clear way to disable a web site created through the builder
application.

## The Solution

Writing a static web page isn't an especially complicated task. The hardest part is writing a stylesheet that looks
good independent of the device displaying it. Even then, writing a sufficient stylesheet is mostly just time-consuming
rather than cognitively challenging. In addition to HTML and CSS, I prepared images and typefaces for Sunset 76. I
prepared the logo, under advisement from the client, using [Inkscape](https://inkscape.org/) and chose 
[Fira Sans](http://mozilla.github.io/Fira/) for the type. I also prepared additional images by rendering PDFs provided
by the California Bureau of Automotive Repair into appropriately sized PNG images.

Getting Turbify to behave was a bigger issue than writing the web page. When I've dealt with web hosting in the past,
it's always been using a dedicated server that I could access using SSH. Unsurprisingly, in a shared hosting
environment this is a no-go. Instead, I needed to do everything through Turbify's cPanel. I don't think this would
have been so bad except that it was only accessible occasionally. Uploading the files wasn't enough though. I still
had to rewrite an `.htaccess` file to make the page visible. I'm not big on [Apache](https://httpd.apache.org/)
(Turbify seems to actually be using [LiteSpeed](https://www.litespeedtech.com/products/litespeed-web-server)) so I had
to learn to do that.

## Thoughts

This was a pretty simple project and, for me, the real lesson was about technical debt. Sunset 76's biggest problem
wasn't creating a functional static web page. Rather, its biggest difficulty was working around past decisions. I'm
sure that, in the past, Turbify made sense. It probably didn't require paying someone like me, and I'm sure that was
a big plus in a world where most small businesses had a minimal web presence. Now, in a time when a web presence is
more crucial the consequences of that previous decision need to be paid off.

In an ideal world, I think Sunset 76 would have ditched Turbify completely. It's better to pay off all of that debt if
possible. Realistically though, business needs to go on as usual, and I wasn't contracted to reimagine Sunset 76's IT
situation. That's just how commercial projects are. It's that way even between friends. It would be nice to return to
this some day and go for broke. Right now though, I'm content with the result.

This project started in January but, for various reasons, had a long hiatus until recently. I don't mind, especially
to help a friend, but I feel like this project somewhat interrupted my flow. Prior to returning to this, I had started
on a [NCURSES](https://invisible-island.net/ncurses/) based game project. Hopefully, in the near term I can focus on
that project. I'd like to get at least a demo completed and available before moving on to anything else.

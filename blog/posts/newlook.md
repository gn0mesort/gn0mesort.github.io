---
title: newlook
style: /css/index.css
---

# newlook { .center }

It has taken me, let's call it, a small amount of time to write since my last post. This is for a couple of reasons. First and foremost, I spent most of the intervening time working on stuff for my Java class. I had a project to work on during that time which consumed a pretty significant amount of my attention. Secondarly I also wanted to update the site's look before posting again. If you're reading this now (June 10th or 11th) then that's done. My Java course is also completed so that's no longer an excuse not to write. I still feel a bit guilty about missing my kinda-sorta-deadline in May. If I'm being honest with myself I know that what I write isn't being read, but it still matters to me that I do it.

Since you're looking at it I should probably justify the new site design a bit. My goal was to make something that had almost as many cool features as the previous design (which was the second iteration) but without any reliance on JavaScript. To be clear I still am utilizing JavaScript but nothing will break if you turn it off (if it does please email me). To this end I've allowed myself a little bit of CSS wizardry and some templating courtesy of `pandoc`. Essentially, where before I was using [showdown](https://github.com/showdownjs/showdown) to render these posts from `markdown` to `html` in the browser I am now rendering them ahead of time with `pandoc`. This also means I am generating a blog index based on metadata rather than using the GitHub API and a `latest.txt` file that I managed myself.

The site layout is also drastically simpler. While it was tempting to do a one page site I like my fixed navbars so I have things split into three sections. The old contact page is gone and replaced with a link to email me. Really if you need to get in touch this is the right way to do it. What's left of the site is a home page (which I can't decide what to do with), this blog section (now divided into an index page and individually rendered post pages), and a projects page (for when I do something worth discussing). Some older projects that were baked into the site (including a magic 8-ball project) are now offline but they're still available within the repository for the site if you roll it back a few commits. Maybe my next goal will be to reestablish those projects as separate repositories (and make them suck less of course).

Overall, I'm pleased with the new design (which took me all weekend to create). It's simpler, requires fewer remote resources, and relies only on standard JavaScript (no more JQuery stuff even though it's cool). It's tempting to have a site with giant JavaScript requirements doing all kinds of cool stuff but the cost is making the site drastically more complex. For instance, to prevent GitHub from freaking out about all the API stuff the old design did I was caching API data into `sessionStorage`. That's all fine and good, I mean what else is storage for, but the amount of code necessary to retrieve API data, maintain the cache of API data on the client, and render everything was huge (comparitvely). All the new tools (in `tools/` within the repository) come in at under 50 lines each. With a total of 6 tools there's a total of fewer than 115 lines of code. The old `blog.js` file that powered this blog is 145 lines by itself. The old site also relied on a separate blog repository that is no longer necessary (I thought this was a very slick solution at the time).

**tl;dr** I'm pretty happy with this layout. I bet by this time next year I'll hate it and change it.

Although you probably don't want it I'm also going to rant a bit about my Java class. I might have mentioned before but I am not a big fan of Java. Despite my distaste for the language the real problem was the course. I really want to like the instructor (who I had last fall for my Assembly course). I really enjoyed learning ARM assembly, fiddling with the Raspberry Pi and just generally becoming more familiar with hardware and software. Going into Java I thought I would get something comparable out. That was probably foolish on my part. Java is much more a beginner's topic than assembly languages (at least usually, obviously Java can get just as advanced and complex as anything else) and I probably should have expected that the class would be necessarily more hand-holdy. We were supposed to cover the following topics:

1. JavaFX
2. Regular Expressions
3. SQL and Databases
4. Parallel Processing
5. Network Socket Programming

We did in fact cover the first 3 topics. I was already pretty well aware of regular expressions going in and JavaFX was new but not super different from C#'s Window's Forms. I had never done anything involving SQL so it was nice to get the hang of that. Unfortunately that's basically where the course stopped. At first it didn't seem like a big deal when the instructor couldn't figure out how to set up MySQL (hint: there are tutorials for this on [mysql.com](https://www.mysql.com/)). This ended up throwing the entire course for a loop. It took 3 weeks for the instructor to really get through discussing databases and it was clear to me that many of my peers were struggling to follow it. Some of them even asked for step by step instructions.

My general disappointment with the course was increased by the final project. It was basically just the assignment for the database portion of the class. I'm 90% sure my instructor didn't write the assignment himself. We were given 4 options which were all functionally identical. To add to my dissapointment in it, I'm also pretty sure that my assignment was less graded and more glanced at. I'm kind of used to that. I understand that a lot of people (at the level of these courses at least) struggle to write code that compiles and doesn't throw a ton of exceptions. If a project compiles that means it doesn't need to be looked over extensively. I get it. It's still kind of sucky to put a ton of effort into an otherwise boring project and then just receive a grade without comment.

Speaking of grading, we were intended to take 10 quizes throughout the semester on various topics. This manifested into 3 total multiple choice quizes (one of which was a final review). I can't help but think this may have amped up the pressure for many of the other students to do well on the final project. We were also assigned only 4 total programming assignments (including the final project). One of these was a review assignment, the other 3 (including the final) were on the topics from my above list in that order (JavaFX, Regular Expressions, Databases). The Regular Expressions assignment took over a month for us to receive a grade on. The final project was graded shortly after the completion of the final test.

The quizes and final  were all multiple choice affairs, graded by a computer. Again, I understand that it's time consuming to grade tests. Especially pracitical examinations in comparison to multiple choice tests. I really couldn't help but feel like it was mostly trivia though. For instance a typical test question was something along the lines of:

Q: JavaFX applications can run on what kind of systems?

A. Windows

B. macOS

C. Linux

D. All of the above

This kind of question might not seem obvious if you're not a programmer/unfamiliar with Java but the answer is D. A big part of the motivation for Java is that it is `Write once, run anywhere`. This isn't always true in practice but that's the company line. More importantly it doesn't actually test your knowledge of programming concepts (Java related or otherwise). You can be an excellent Java programmer and never worry about this question. It's not a real test of skill. It didn't help things that the instructor was pretty inattentive in creating the tests. A number of questions on the final review had the wrong answers. This included a question with an example program that wouldn't properly compile without modification. I ultimately decided to contact my instructor about this but I never heard back.

We did, briefly, cover networking and parallel programming. This took place in the last 30 minutes of the final lecture of the sememester.

**tl;dr** My java class was a disorganized trainwreck.

That's all behind us now though, isn't it? It's the summer now and I've got a new set of goals. What I'd really like to do is do at least 1 programming exercise a week as well as complete 1 concrete step toward making a small computer game each week. My intention is to post the results here. Hopefully, by August I have something worth showing you. I think if I say it here that will make it more real.

Anyways it's time for me to say goodbye for now. I'm thinking of you, wherever you are 🙇 I hope you're alright out there!
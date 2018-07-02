---
title: offtrack
style: /css/index.css
---

# Off Track { .center }

Naturally, I blew it. 😂 I'm not super surprised that I got sidetracked in the second week. I had a lot of homework and `irl` work to focus on. Luckily the rest of the summer should be more manageable for me. I did do another programming thing in the last week so we can talk about that.

I went with this more complex but still fairly simple challenge:

> Write a program that identifies errors in braces and quotation marks. Indicate where in the input an error occurred and return a value indicating whether or not there was an error.

Originally I was going to do a code golf version of this but, as I mentioned before, I got pretty sidetracked. One reason I chose this particular exercise was that I remembered it being discussed by a class I took way back in 2011 (C++ with data structures) and I realized that I had never attempted it.

The basic premise here is simple. We want to make sure we have the right number of the following symbols: `()[]{}<>` Additionally we want to ensure the following symbols are correctly paired: `'` and `"`

So how do we go about it? Well the reason it came up in the class I mentioned is because we can use a `stack`. Stacks are pretty simple (if you don't already know what they are). It's basically just like a stack of blocks or plates in real life. You put stuff onto the top of the stack. Then when I want to get at stuff in the stack again I need to take each item off one by one (otherwise the whole thing will collapse).

Here's my code:

```cpp
#include <cstddef>

#include <iostream>
#include <vector>
#include <utility>
#include <string>
#include <map>
#include <stack>

size_t match_braces(const std::string &str);
size_t match_quotes(const std::string &str);

int main(int argc, char **argv) {
  int r = EXIT_SUCCESS;
  std::vector<std::string> lines;
  for (int i = 1; i < argc; ++i) { lines.push_back(argv[i]); }
  for (const std::string &line : lines) {
    size_t brace_error = match_braces(line),
           quote_error = match_quotes(line);

    std::cout << line << std::endl;
    if (brace_error < line.size()) {
      std::cout << std::string(brace_error, '~') << "^" << " <-- BRACE ERROR"
                << std::endl;
      r = EXIT_FAILURE;
    }
    if (quote_error < line.size()) {
      std::cout << std::string(quote_error, '~') << "^" << " <-- QUOTE ERROR"
                << std::endl;
      r = EXIT_FAILURE;
    }
  }

  return r;
}

size_t match_braces(const std::string &str) {
  const std::string OPENING_BRACES = "([{<",
                    CLOSING_BRACES = ")]}>";

  std::stack<std::pair<char, size_t>> brace_stack;

  for (auto cur = str.begin(); cur < str.end(); ++cur) {
    if (OPENING_BRACES.find(*cur) != std::string::npos) {
      brace_stack.push(std::make_pair(*cur, cur - str.begin()));
    }
    else if (CLOSING_BRACES.find(*cur) != std::string::npos) {
      if (!brace_stack.empty() &&
          CLOSING_BRACES[
                          OPENING_BRACES.find(std::get<0>(brace_stack.top()))
                        ] == *cur) {
          brace_stack.pop();
        }
        else {
          return cur - str.begin();
        }
    }
  }
  if (!brace_stack.empty()) { return std::get<1>(brace_stack.top()); }
  return str.end() - str.begin();
}

size_t match_quotes(const std::string &str) {
  std::map<char, bool> quotes {
    { '\"', false },
    { '\'', false },
    { '`', false }
  };
  std::stack<std::pair<char, size_t>> quote_stack;

  for (auto cur = str.begin(); cur < str.end(); ++cur) {
    if (quotes.find(*cur) != quotes.end()) {
        if (!quotes[*cur]) {
          quote_stack.push(std::make_pair(*cur, cur - str.begin()));
          quotes[*cur] = true;
        }
        else if (!quote_stack.empty() &&
                 std::get<0>(quote_stack.top()) == *cur) {
          quote_stack.pop();
          quotes[*cur] = false;
        }
        else {
          return cur - str.begin();
        }
    }
  }
  if (!quote_stack.empty()) { return std::get<1>(quote_stack.top()); }
  return str.end() - str.begin();
}
```

Hopefully it's obvious why I didn't want to play golf with this 😂. I don't think the code itself is super complex (I'm sure you could go less complex). I'm actually using two different data structures here (`stack`s and `map`s) but the important one is the stack. The trick is that each time we find one of our symbols (either quotes or brackets) we push that symbol onto a stack. Our search can end in a few ways:

1. A closing symbol is found but the top of the stack is not a matching open symbol

2. The end of the string is reached but there are still symbols on the stack

3. The end of the string is reached and the stack is empty

In the first two cases we know there was an error (and where the error is because we were storing the position in a `std::pair<char, size_t>`). In the third case things went alright 🎉. Quotation marks are a bit trickier than brackets because they use the same mark for starting and ending. For that reason I ended up separating the logic for quote marks from brackets. They're very similar though.

The final step is output. The output for this is about what you'd expect. You get the input string. If there is an error a line of `~` characters are printed followed by a `^` indicating where the error is. The program will also return an error code if there was an error. If you can't tell something is wrong from all that I'm not sure what to do 😝. 

Anyways that's about all for the last couple weeks. Hopefully I'll have more soon but I don't necessarily think I should commit to a weekly schedule (I end up having very little to say). I felt pretty guilty to miss writing too. Even when I don't write I'm always thinking of you, wherever you are. As always I hope you're alright out there 🙇
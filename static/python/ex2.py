"""
ageguesser.py

The goal of this program is to guess the age of the user.

Your program should have the following features:

1. It should calculate a guess and ask the user if it's correct.
2. If the guess isn't correct, the program should ask the user if their age is greater than or less than the guess.
3. After an incorrect guess, it should calculate a new guess and try again.
4. The program should track how many guesses it makes and report how it did once it guesses correctly
5. If the program can't figure out the user's age, it should print a special message.
6. Once you have a working program, think about how many guesses you should really need. Can you make your program a better age guesser?

Example Input and Output:

Is your age 58? (Enter Y for yes and N for no): N
Is your age greater than 58? (Enter Y for yes and N for no): N
Is your age 29? (Enter Y for yes and N for no): N
Is your age greater than 29? (Enter Y for yes and N for no): N
Is your age 15? (Enter Y for yes and N for no): Y
Your age was 15! I needed 3 guesses to figure it out!

Is your age 58? (Enter Y/N) N
Is your age greater than 58? Enter (Y/N) Y
Is your age 86? (Enter Y/N) N
Is your age greater than 86? Enter (Y/N) Y
Is your age 100? (Enter Y/N) N
Is your age greater than 100? Enter (Y/N) N
Is your age 93? (Enter Y/N) Y
Your age was 93! I needed 4 guesses to figure it out!

Is your age 58? (Enter Y/N) n
Is your age greater than 58? Enter (Y/N) n
Is your age 29? (Enter Y/N) n
Is your age greater than 29? Enter (Y/N) n
Is your age 15? (Enter Y/N) n
Is your age greater than 15? Enter (Y/N) n
Is your age 8? (Enter Y/N) n
Is your age greater than 8? Enter (Y/N) n
Is your age 4? (Enter Y/N) n
Is your age greater than 4? Enter (Y/N) n
Is your age 2? (Enter Y/N) n
Is your age greater than 2? Enter (Y/N) n
Is your age 1? (Enter Y/N) n
Is your age greater than 1? Enter (Y/N) n
I couldn't guess your age, are you cheating!?

Hints:

- Use the example output as a guide. Is there a pattern to how the program is guessing? How does it choose its guesses?
- Recall that strings in Python have their own built in functionality called methods. You can use string methods to check if the input starts with "Y" or "N"
- Think about how old the oldest person is and how old the youngest person is. Is anyone older than 120? Is anyone younger than 1?

"""

# Your code goes below here!
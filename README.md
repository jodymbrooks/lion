# Brave - the card game
Brave is a simple matching card game that mixes risk-taking to get more points as well as using your memory to remember what's played (ala the "Concentration" memory card game).

The deck consists of 81 cards where each card has four attributes: a color, a count, a shape and a patt


## Ideas
 - [ ] Use icons for the matching attrs instead of words to make that shorter
 - [ ] Create a computer player
 - [ ] Allow for a one-deal game (or some other way to make it go more quickly)
 - [ ] Add an intro/help screen
 - [ ] Keep high scores
 - [ ] Prompt for player names
 - [ ] Allow for more than two players

## Bugs
 - [ ] Once the cards remaining goes to 0, either the next deal or the one after that will replenish the cards back up to a full deck
 - [ ] The shuffling still doesn't seem random enough but no matter how many times I shuffle the deck, it's always about the same... the test is that **most** of the time, I can pick two cards side by side and they'll match as a two-some.  If not, then usually one of the cards beside those two will match one of those. This happens way too often for the shuffling to seem random. Need to check play with a real deck and see if this happens there too. It may just simply be due to the statistics of the available attributes, etc.
<!--stackedit_data:
eyJoaXN0b3J5IjpbNjg1MTI4MjE4XX0=
-->
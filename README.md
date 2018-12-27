# Brave - the card game
Brave is a simple matching card game that mixes risk-taking to get more points as well as using your memory to remember what's played (ala the "Concentration" memory card game).

The deck consists of 81 cards where each card has four attributes each with  three possible values. These are:

 - color
     - red
     - green
     - purple
 - shape
	 - ellipse
	 - rectangle
	 - diamond
 - count
	 - one
	 - two
	 - three
 - pattern
	 - empty
	 - filled
	 - lined

A table of 20 cards is dealt (5 x 4) face down. The first player then choose two cards. If these match in any one of the above attributes (color, shape, count and/or pattern), then this is a match of a possible 4 points. The player then has the choice to keep these cards as a set, or to select another card that will hopefully match the first two cards. For example if the first two cards matched in color and shape (say, red rectangles), then the third card would need to be either a red or a rectangle (or both) for the three cards to still be considered a match. This three-card match would be worth 9 points, so the value of the risk might be worth it as it is more than double the 4 points the first two were worth.
If the cards do match, the player has the choice to continue selecting a card at a time hoping for continued matching. A four-card match would be worth 16 points, five-card match worth 25 and so on (the points are the square of the number of cards in the matching set). At some point the player will either choose to keep the set.

However if the third card does not match, the 
 

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
eyJoaXN0b3J5IjpbLTMxMjY3MzMzMSwtMTkzMzc3MTcwMV19
-->
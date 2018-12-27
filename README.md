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

If the cards do match, the player has the choice to continue selecting a card at a time hoping for continued matching. A four-card match would be worth 16 points, five-card match worth 25 and so on (the points are the square of the number of cards in the matching set). This brings in the risk element (are you **brave** enough?)

At some point the player will either choose to keep the set or will select a non-matching card. When keeping the cards, the player will remove them and add to his/her pile of sets and will get  that many points, and new cards will be dealt into the empty slots. However if a non-matching card is selected, the cards are left visible for a moment longer so all other players may see them, then they are turned back face-down in place (do not rearrange the cards) and it is the next player's turn.

The next player may then choose any two cards to begin their own match attempt, and of course they may choose to select any cards seen from previous players' turns. This brings in the memory element.

Play continues until no more matches may be made and no more cards are left to deal. Note that at some point, the remaining deck will be empty but there will still be cards on the table to play. Play continues still at this point; however the empty slots on the table need to remain empty *without* rearranging the remaining cards to fill the slot. This would hurt players' memory of what cards had been played and where. So always keep the 5x4 table size even if there are empty slots on the table.

At the end, the player with the 
 

## Ideas for enhancements
 - [ ] Use icons for the matching attrs instead of words to make that shorter
 - [ ] Create a computer player
 - [ ] Allow for a one-deal game (or some other way to make it go more quickly)
 - [ ] Add an intro/help screen
 - [ ] Keep high scores
 - [ ] Prompt for player names
 - [ ] Allow for more than two players

## Known Issues
 - [ ] Once the cards-remaining goes to 0, either the next deal or the one after that will replenish the cards back up to a full deck
 - [ ] The shuffling still doesn't seem random enough but no matter how many times I shuffle the deck, it's always about the same... the test is that **most** of the time, I can pick two cards side by side and they'll match as a two-some.  If not, then usually one of the cards beside those two will match one of those. This happens way too often for the shuffling to seem random. Need to check play with a real deck and see if this happens there too. It may just simply be due to the statistics of the available attributes, etc.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIwMzkzOTcxODEsLTE5MzM3NzE3MDFdfQ
==
-->
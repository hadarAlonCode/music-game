
## Music Game 

### Rules:
- Each game has 10 rounds
- Each round shows a photo of a music album, and a list of 5 - random artists (one of the artists is the correct answer).
- The user has to guess which artist released the album.

###### Game screenshot
![alt text](/images/Main.png "Guess the artist")
###### Game Over Page
![alt text](/images/end.png "Game Over")


### Built With:
- React
- iTunes Search API

### features:

Score:

- First guess = 10 points
- Second guess = 5 points
- Third guess = 2 points
- If the user fails to guess within 3 guesses, he will lose 5 points, and will be taken to the next question.
- Bonus - For 3 consecutive correct guesses, the user will receive a 10 point bonus

- If the user guess 6 consecutive questions,
the user will receive 100 points. 
- If the user guess 9 consecutive questions he will get 1000 points and so on.

- There are 5 artists that worth 5 bonus points

- The game keeps the highest score


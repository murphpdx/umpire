# umpire

The Umpire app is a simple react app used to help a kickball home plate ump keep score. The app is intended to be used on a phone or small device. 

The app is hosted by github pages and can be found here: https://murphpdx.github.io/umpire/

## Running it locally

You will need to install the dependancies first by running: 

```bash
npm i
```

Then you can run the app using: 

```bash
npm run start
```

To view the app locally navigate to `localhost:8080` in your browser. 

## Features

### Inning tracker

The inning tracker can be found at the top of the page. Innings can be adjusted using the up and down chevrons. Innings will automatically update based on the number of outs. 

### Score

The blue and red boxes are keep track of the current score. Each team's points can be adjusted using the chevrons to the right of them. The score is also updated when the "Runner Scored" button is clicked or if the bases are loaded and a player walks. 

### Runner Scored

The runner scored button will add a point to the current kicking teams score. It will also remove the most advanced runner from the bases display. 

### Runner safe. 

The runner safe button will add a runner to the bases display and reset the batting trackers. If the bases were loaded prior to clicking the button it will also increment the teams score.

### Outs, strikes, Balls, Fouls

All items can be incremented by clicking the icon to the right of the label. 

Outs: When the outs are incremented it will clear the strikes/balls/fouls/bases. If there were previously 2 outs it will increment the inning and clear the outs. 
Strikes: When strikes are incremented and there were previously 2 strikes it will clear the strikes/balls/fouls and increment the outs.
Balls: When the balls are updated and there were previously 3 balls it will clear the strikes/balls/fouls and add a runner to the bases. If there have not been any fouls between the 4 balls it will walk the runner 2 bases and an alert will appear to let the umpire know.
Fouls: When the fouls are incremented and there were previously 3 fouls it will clear the strikes/balls/fouls. It will also increment the outs. 

### Bases display

The bases display will be automatically updated based on walks and runners safe. It can be updated at any time by clicking on the base to add or remove a runner.

### Game clock

The game clock is displayed at the bottom of the screen. The clock will start when the play button is clicked, the play button will then flip to be a pause button. It can be cleared by clicking the x button.

### Walked two bases 


| first | second | third | -> | first | second | third | score incremented by |
|-------|--------|-------|----|-------|--------|-------|---------------------|
|   0   |    0   |   0   | -> |   0   |    1   |   0   | 0                   |
|   1   |    0   |   0   | -> |   0   |    1   |   1   | 0                   |
|   0   |    1   |   0   | -> |   0   |    1   |   1   | 0                   |
|   0   |    0   |   1   | -> |   0   |    1   |   1   | 0                   |
|   1   |    1   |   0   | -> |   0   |    1   |   1   | 1                   |
|   1   |    0   |   1   | -> |   0   |    1   |   1   | 1                   |
|   0   |    1   |   1   | -> |   0   |    1   |   1   | 1                   |
|   1   |    1   |   1   | -> |   0   |    1   |   1   | 2                   |

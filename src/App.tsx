import React, { ReactNode } from 'react';
import './App.scss';
import HideSourceIcon from '@mui/icons-material/HideSource';
import DoNotDisturbOffTwoToneIcon from '@mui/icons-material/DoNotDisturbOffTwoTone';
import SportsBaseballTwoToneIcon from '@mui/icons-material/SportsBaseballTwoTone';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import OutboundOutlinedIcon from '@mui/icons-material/OutboundOutlined';
import OutboundIcon from '@mui/icons-material/Outbound';
import Button from '@mui/material/Button';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// enum Teams {
//     true = "Home",
//     false = "Away"
// }

function App() {
  const maxBalls = 4;
  const maxFouls = 4;
  const maxOuts = 3;
  const [outs, setOuts] = React.useState(0);
  const [halfInning, setHalfInnings] = React.useState(0);
  const [ballCount, setBallCount] = React.useState(0)
  const [fouls, setFouls] = React.useState(0)
    const [homeScore, setHomeScore] = React.useState(0)
    const [awayScore, setAwayScore] = React.useState(0)

  const incrementOuts = () => {
      if (outs === maxOuts - 1) {
          setOuts(0)
          setHalfInnings(halfInning+1)
          return;
      }
      setOuts(outs + 1)
  }

  const renderInnings = (): string => {
      const inningSide = halfInning % 2 ? 'Bottom' : 'Top';
      let inningNumber = Math.floor(halfInning/2) + 1
      let inning: string = '';

      switch (inningNumber) {
          case 1:
              inning = `${inningNumber}st`
              break;
          case 2:
              inning = `${inningNumber}nd`
              break;
          case 3:
              inning = `${inningNumber}rd`
              break;
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
              inning = `${inningNumber}th`
              break;
          default:
              inning = ''
      }

      return `${inningSide} of the ${inning}`
  }

  const renderedOuts = (): ReactNode => {
      return renderIcons(<DoNotDisturbOffTwoToneIcon fontSize="large" />, <HideSourceIcon fontSize="large" />, outs, maxOuts);
  }

  const renderIcons = (filledNode: ReactNode, outlinedNode: ReactNode, count: number, total: number): ReactNode => {
      const nodes = [];
      for (let i = 0; i < count; i++) {
          nodes.push(filledNode)
      }
      for (let i = count; i < total; i++) {
          nodes.push(outlinedNode)
      }
      return nodes;
  }

  const renderBalls = (): ReactNode => {
      return renderIcons(<SportsBaseballIcon fontSize="large" />, <SportsBaseballTwoToneIcon fontSize="large" />, ballCount, maxBalls);
  }

  const renderFouls = (): ReactNode => {
      return renderIcons(<OutboundIcon fontSize="large" />, <OutboundOutlinedIcon fontSize="large" />, fouls, maxFouls);
  }

  const newBatter = () => {
      setFouls(0);
      setBallCount(0)
  }

  const incrementBalls = () => {
      if (ballCount === maxBalls-1) {
          newBatter();
          return
      }
      setBallCount(ballCount+1)
  }

  const incrementFouls = () => {
      if (fouls === maxFouls-1) {
          newBatter()
          incrementOuts()
          return
      }
      setFouls(fouls+1)
  }

  const runnerScored = () => {
      const team = halfInning % 2;
      if (team) {
          setAwayScore(awayScore+1);
          return
      }
      setHomeScore(homeScore+1)
  }

  const incrementAwayScore = () => {
      setAwayScore(awayScore+1)
  }
  const decrementAwayScore = () => {
    if (awayScore === 0) {
        return
    }
    setAwayScore(awayScore-1)
  }
    const incrementHomeScore = () => {
        setHomeScore(homeScore+1)
    }
    const decrementHomeScore = () => {
        if (homeScore === 0) {
            return
        }
        setHomeScore(homeScore-1)
    }

  return (
    <div className="App">
        <div className="AppHeader">
            {renderInnings()}
        </div>
        <div className="AppScoresHeaders">
            <div className="AppScoresHeadersEach">
             Home
            </div>
            <div className="AppScoresHeadersEach">
              Away
            </div>
        </div>
        <div className="AppScores">
            <div className="AppScoresHomeUpdate">
                <ExpandLessIcon onClick={incrementHomeScore}/>
                <br/>
                <KeyboardArrowDownIcon onClick={decrementHomeScore} />
            </div>
            <div className="AppScoresHome">
                {homeScore}
            </div>
            <div className="AppScoresAway">
                {awayScore}
            </div>
            <div className="AppScoresAwayUpdate">
                <ExpandLessIcon onClick={incrementAwayScore}/>
                <br/>
                <KeyboardArrowDownIcon onClick={decrementAwayScore} />
            </div>
        </div>
        <div className="AppButtons">
            <div className="AppButtonsOne">
                <Button variant="contained" onClick={runnerScored}>Runner scored</Button>
            </div>
            <div className="AppButtonsOne">
                <Button variant="contained" onClick={newBatter}>Runner safe</Button>
            </div>
        </div>
        <div className="AppCounts">
            <div className="AppCountsOuts" onClick={incrementOuts}>
                <b>Outs</b>
                { renderedOuts() }
            </div>
            <div className="AppCountsBalls" onClick={incrementBalls}>
                <b>Balls</b>
                { renderBalls() }
            </div>
            <div className='AppCountsFouls' onClick={incrementFouls}>
                <b>Fouls</b>
                { renderFouls() }
            </div>
        </div>

        <div className="AppBases">
            <div className="AppBasesRow">
                <div className="AppBasesFirst"></div>
                <div className="AppBasesSecond"></div>
            </div>
            <div className="AppBasesRow">
                <div className="AppBasesThird">3</div>
                <div className="AppBasesHome"></div>
            </div>
        </div>
    </div>
  );
}

export default App;

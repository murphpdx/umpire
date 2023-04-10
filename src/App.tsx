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
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CancelIcon from '@mui/icons-material/Cancel';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

function App() {
  const maxBalls = 4;
  const maxFouls = 4;
  const maxOuts = 3;
  const maxStrikes = 3;
  const emptyBases = [false, false, false]
  const [outs, setOuts] = React.useState(0);
  const [halfInning, setHalfInnings] = React.useState(0);
  const [ballCount, setBallCount] = React.useState(0)
  const [fouls, setFouls] = React.useState(0)
  const [homeScore, setHomeScore] = React.useState(0)
  const [awayScore, setAwayScore] = React.useState(0)
  const [strikes, setStrikes] = React.useState(0)
  const [baseStatus, setBaseStatus] = React.useState(emptyBases)

  const incrementOuts = () => {
    resetBatterStats()
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
      default:
        inning = `${inningNumber}th`
        break;
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

  const renderStrikes = (): ReactNode => {
    return renderIcons(<CancelIcon fontSize="large" />, <HighlightOffIcon fontSize="large" />, strikes, maxStrikes);
  }

  const runnerSafe = () => {
    addRunner()
  }

  const resetBatterStats = () => {
    setFouls(0);
    setBallCount(0)
    setStrikes(0)
  }

  const incrementBalls = () => {
    if (ballCount === maxBalls-1) {
      addRunner()
      resetBatterStats();
      return
    }
    setBallCount(ballCount+1)
  }

  const incrementFouls = () => {
    if (fouls === maxFouls-1) {
      resetBatterStats()
      incrementOuts()
      return
    }
    setFouls(fouls+1)
  }

  const runnerScoredButton = () => {
    const newBaseStatus = structuredClone(baseStatus);
    incrementScore();

    for (let i = 2; i > -1; --i) {
      if (baseStatus[i]) {
        newBaseStatus[i] = false;
        setBaseStatus(newBaseStatus)
        return;
      }
    }
  }

  const incrementScore = () => {
    const team = halfInning % 2;
    if (team) {
      setHomeScore(homeScore+1)
      return
    }
    setAwayScore(awayScore+1);
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

  const incrementStrikes = () => {
    if (strikes === maxStrikes - 1) {
      setStrikes(0)
      incrementOuts()
      return
    }
    setStrikes(strikes+1)
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

  const flipBase = (baseNumber: number) => {
    const newBaseStatus = structuredClone(baseStatus);
    newBaseStatus[baseNumber] = !newBaseStatus[baseNumber];
    setBaseStatus(newBaseStatus)
  }

  const addRunner = () => {
    const newBaseStatus = structuredClone(baseStatus);
    for (let i = 0; i < 3; ++i) {
      if (!baseStatus[i]) {
        newBaseStatus[i] = true;
        setBaseStatus(newBaseStatus)
        return
      }
      if (i === 2) {
        incrementScore()
        resetBatterStats();
        setBaseStatus(emptyBases)
      }
    }
  }

  const incrementInning = () => {
    setHalfInnings(halfInning + 1)
  }

  const decrementInning = () => {
    if (halfInning === 0) {
      return
    }
    setHalfInnings(halfInning - 1)
  }

  return (
    <div className="App">
      <div className="AppHeader">
        <div className="AppHeaderTitle">
          { renderInnings() }
        </div>
        <div className="AppHeaderInningControls">
          <ExpandLessIcon onClick={incrementInning}/>
          <br/>
          <KeyboardArrowDownIcon onClick={decrementInning} />
        </div>
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
          <div className="AppScoresHome">
            {homeScore}
          </div>
          <div className="AppScoresHomeUpdate">
            <ExpandLessIcon onClick={incrementHomeScore}/>
            <br/>
            <KeyboardArrowDownIcon onClick={decrementHomeScore} />
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
            <Button variant="contained" onClick={runnerScoredButton}>Runner scored</Button>
          </div>
          <div className="AppButtonsOne">
            <Button variant="contained" onClick={runnerSafe}>Runner safe</Button>
          </div>
        </div>
        <div className="AppCounts">
          <div className="AppCountsLabelColumn">
            <b>Outs</b>
            <br />
            <b>Strikes</b>
            <br />
            <b>Balls</b>
            <br />
            <b>Fouls</b>
          </div>
            <div className="AppCountsCountColumn">
              <div className="AppCountsOuts" onClick={incrementOuts}>
                { renderedOuts() }
              </div>
              <div className="AppCountsStrikes" onClick={incrementStrikes}>
                { renderStrikes() }
              </div>
              <div className="AppCountsBalls" onClick={incrementBalls}>
                { renderBalls() }
              </div>
              <div className='AppCountsFouls' onClick={incrementFouls}>
                { renderFouls() }
              </div>
            </div>
        </div>

        <div className="AppBases">
          <div className="AppBasesRow">
            <div className="AppBasesSecond" onClick={() => flipBase(1)}>
              <div className="AppBasesIcon">
                <DirectionsRunIcon fontSize="large" style={{ color: '#282c34', display: baseStatus[1] ? "inline" : "none" }} />
              </div>
            </div>
              <div className="AppBasesFirst" onClick={() => flipBase(0)}>
                <div className="AppBasesIcon">
                  <DirectionsRunIcon fontSize="large" style={{ color: '#282c34', display: baseStatus[0] ? "inline" : "none"  }} />
                </div>
              </div>
          </div>
          <div className="AppBasesRow">
            <div className="AppBasesThird" onClick={() => flipBase(2)}>
              <div className="AppBasesIcon">
                <DirectionsRunIcon fontSize="large" style={{ color: '#282c34', display: baseStatus[2] ? "inline" : "none"  }} />
              </div>
            </div>
            <div className="AppBasesHome"></div>
          </div>
        </div>
    </div>
  );
}

export default App;

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
import WarningIcon from '@mui/icons-material/Warning';
import {getNumberSuffix, renderIcons} from "./utils";
import {Stopwatch} from "./stopwatch";

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
  const [mercyRule, setMercyRule] = React.useState(false)
  const [slaughterRule, setSlaughterRule] = React.useState(false)
  const [pointsPerInning, setPointsPerInning] = React.useState(0)

  const incrementOuts = () => {
    resetBatterStats()
    if (outs === maxOuts - 1) {
      setOuts(0)
      setHalfInnings(halfInning+1)
      setPointsPerInning(0)
      setBaseStatus(emptyBases)
      return;
    }
    setOuts(outs + 1)
  }

  const renderInnings = (): string => {
    const inningSide = halfInning % 2 ? 'Bottom' : 'Top';
    let inningNumber = Math.floor(halfInning/2) + 1

    return `${inningSide} of the ${getNumberSuffix(inningNumber)}`
  }

  const renderedOuts = (): ReactNode => {
    return renderIcons(<DoNotDisturbOffTwoToneIcon fontSize="large" />, <HideSourceIcon fontSize="large" />, outs, maxOuts);
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
    resetBatterStats()
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

  const checkRules = () => {
    const diff = homeScore - awayScore;
    if (diff >= 11 || diff <= -11) {
      setSlaughterRule(true)
    }
    if (pointsPerInning === 7) {
      setMercyRule(true)
    }
  }

  const incrementScore = () => {
    setPointsPerInning(pointsPerInning+1)
    const team = halfInning % 2;
    if (team) {
      setHomeScore(homeScore+1)
      checkRules()
      return
    }
    setAwayScore(awayScore+1);
    checkRules()
  }

  const incrementAwayScore = () => {
    setPointsPerInning(pointsPerInning + 1)
    setAwayScore(awayScore+1)
    checkRules()
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
    setPointsPerInning(pointsPerInning + 1)
    setHomeScore(homeScore+1)
    checkRules()
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
      }
    }
  }

  const incrementInning = () => {
    setHalfInnings(halfInning + 1)
    setPointsPerInning(0)
    setMercyRule(false)
    setSlaughterRule(false)
  }

  const decrementInning = () => {
    if (halfInning === 0) {
      return
    }
    setHalfInnings(halfInning - 1)
    setPointsPerInning(pointsPerInning+1)
  }

  return (
    <div className="App">
      <div className="AppWarnings">
        <div className="AppWarningsMercy" style={{ display: mercyRule ? "block" : "none" }}>
          <WarningIcon fontSize="small" /> Mercy rule applies.
        </div>
        <div className="AppWarningsSlaughter" style={{ display: slaughterRule ? "block" : "none" }}>
          <WarningIcon fontSize="small" /> Slaughter rule applies, if teams agree.
        </div>
      </div>
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
      <Stopwatch/>
    </div>
  );
}

export default App;

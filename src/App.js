import './App.css';
import React from 'react';
import { Paper, Chip, Avatar } from '@material-ui/core';
import ScoreInput from './score-input/ScoreInput';
import Menu from './menu/Menu';


function App() {
  const [playerNames, setPlayerNames] = React.useState(["Player 1", "Player 2"]);
  const [gameResetCount, setGameResetCount] = React.useState(1);

  const handlePlayersChanged = (players) => {
    setPlayerNames(players);
    setGameResetCount(gameResetCount + 1);
  }

  const resetScore = () => {
    setGameResetCount(gameResetCount + 1);
  }

  return (
    <div class="app">
      <Menu onPlayersChanged={handlePlayersChanged} onResetScore={resetScore} />
      <Match playerNames={playerNames} key={gameResetCount} />
    </div>
  );
}

export default App;


class Match extends React.Component {
  constructor(props) {
    super(props);

    const players = this.createNewPlayers(this.props.playerNames);
    this.state = {
      players: players, // TODO: (a) refactor
      firstPlayer: 0,
      currentPlayer: 0, // TODO: can be computed
      shotHistory: [],  // TODO: (a) refactor
      initialScore: 50
    };
  }

  createNewPlayers(playerNames) {
    return playerNames.map(name => ({
      name: name,
      history: [],
      legsWon: 0
    }));
  }

  onScoreReported(value, modifier) {
    const points = value * modifier;

    const currentPlayer = this.state.currentPlayer;
    const shotHistory = [...this.state.shotHistory, currentPlayer];
    const players = [...this.state.players];

    const updatedPlayer = players[currentPlayer];
    updatedPlayer.history.push(points);


    const remainingScore = this.state.initialScore - updatedPlayer.history.reduce((sum, val) => sum + val, 0);
    let nextPlayer = currentPlayer;
    if (remainingScore > 0) {
      if (updatedPlayer.history.length % 3 === 0) {
        nextPlayer = (currentPlayer + 1) % this.state.players.length
      }
    } else if (remainingScore === 0) {
      updatedPlayer.legsWon++;
      players.forEach(p => p.history = []);
      nextPlayer = (this.state.firstPlayer + 1) % this.state.players.length;

      this.setState({
        players: players,
        shotHistory: [],
        currentPlayer: nextPlayer,
        firstPlayer: nextPlayer
      });
    } else {
      while (shotHistory[shotHistory.length - 1] === currentPlayer) {
        shotHistory.pop();
        updatedPlayer.history.pop();
      }
      nextPlayer = (currentPlayer + 1) % this.state.players.length;
    }

    this.setState({
      players: players,
      shotHistory: shotHistory,
      currentPlayer: nextPlayer
    });
  }

  onUndoScore() {
    if (this.state.shotHistory.length === 0) {
      return;
    }

    const players = [...this.state.players];

    const shotHistory = this.state.shotHistory;
    const newShotHistory = shotHistory.slice(0, shotHistory.length - 1);

    const lastShootingPlayerIndex = shotHistory[shotHistory.length - 1];
    const playerHistory = players[lastShootingPlayerIndex].history;
    players[lastShootingPlayerIndex].history = playerHistory.slice(0, playerHistory.length - 1);

    const turns = Math.floor((newShotHistory.length) / 3);
    const currentPlayer = (this.state.firstPlayer + turns) % this.state.players.length;

    this.setState({
      players: players,
      shotHistory: newShotHistory,
      currentPlayer: currentPlayer
    })
  }

  render() {
    return (
      <div>
        <PlayerScores players={this.state.players} currentPlayer={this.state.currentPlayer} initialScore={this.state.initialScore} />
        {/* <PlayerTurn values={["123", "0"]} /> */}
        <ScoreInput next={(value, modifier) => this.onScoreReported(value, modifier)} undo={() => this.onUndoScore()} />
      </div>
    );
  }
}

const PlayerTurn = (props) => {
  return (
    <Paper elevation={2} className="player-turn">
      {props.values
        .concat(['?', '?', '?'])
        .slice(0, 3)
        .map((value, i) =>
          <Chip label={value} color="primary" avatar={<Avatar>{i + 1}</Avatar>} key={i} />
        )}
    </Paper>
  );
}

const PlayerScores = (props) => {
  const calculateAverage = player => {
    if (player.history.length === 0) {
      return 0;
    }

    const sum = player.history.reduce((sum, val) => sum + val, 0);
    const darts = player.history.length;

    if (darts >= 3) {
      return sum / (darts / 3);
    } else if (darts === 1) {
      return sum * 3;
    } else if (darts === 2) {
      return sum * 1.5;
    }

    return sum / darts;
  }

  const calculateRemaining = player => {
    const remaining = props.initialScore - player.history.reduce((sum, val) => sum + val, 0);

    return remaining;
  }

  return (
    <div className="scores">
      {props.players.map((player, i) =>
        <PlayerScore active={props.currentPlayer === i}
          name={player.name}
          score={calculateRemaining(player)}
          average={calculateAverage(player)}
          legs={player.legsWon}
          key={player.name}
        />
      )}
    </div>
  );
}

const PlayerScore = (props) => {
  return (
    <Paper elevation={2} className={'player-score ' + (props.active ? 'active' : '')}>
      <div className="name">{props.name}</div>
      <div className="score">{props.score}</div>
      <div className='statistics'>
        <span>
          Legs: {props.legs}
        </span>
        <span>
          Ø {props.average}
        </span>
      </div>
    </Paper>
  );
}

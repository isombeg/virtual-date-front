import logo from './logo.svg';
import './App.css';
import React from 'react';

import PlayerEntry from './Components/PlayerEntry';
import GameDisplay from './Components/GameDisplay';

class App extends React.Component {
  // ws = new WebSocket('ws://localhost:8080/')
  // ws = new WebSocket('ws://git.heroku.com/virtual-date-api.git')
  ws = new WebSocket('wss://virtual-date-api.herokuapp.com/')
  
  constructor(){
    super();
    this.state = {
      playerName: null,
      gameState: null
    }
  }

  componentDidMount() {
      this.ws.onopen = () => {
        // on connecting, do nothing but log it to the console
        console.log('connected')
      }

      this.ws.onmessage = evt => {
        // listen to data sent from the websocket server
        this.setState({gameState: JSON.parse(evt.data)})
        console.log(evt.data);
      }

      this.ws.onclose = () => {
        console.log('disconnected')
        // automatically try to reconnect on connection loss

      }

  }

  forwardEvent = (event) => () => {
    this.ws.send(JSON.stringify(event))
  }

  setPlayer = (name) => {
    this.setState({playerName: name})
  }

  resetGame = () => {
    this.forwardEvent({event: 'reset'})();
    this.wipeState()
  }

  wipeState = () => {
    this.setState({
      playerName: null,
      gameState: null
    })
  }
  
  render(){
    const {playerName, gameState, resetGame} = this.state;
    console.log(gameState);

    if(!gameState){
      return (
        <div>
          <p>Loading Game</p>
        </div>
      )
    }
    if(gameState.stage === 'player_entry'){
      return (
        <div className="canvas-div">
          <PlayerEntry
            forwardEvent={this.forwardEvent}
            takenPlayers={gameState && gameState.players}
            setPlayer={this.setPlayer}
            playerName={playerName}
            />
        </div>
      )
    }
    
    return (
      <div className="canvas-div">
        <GameDisplay gameState={gameState} reset={resetGame} playerName={playerName} forwardEvent={this.forwardEvent} wipeState={this.wipeState}/>
      </div>
    );
  }
}

export default App;

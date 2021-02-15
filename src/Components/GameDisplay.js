import '../App.css';
import React from 'react';

import Score from './Score';
import PlayerEntry from './PlayerEntry';
import PunishmentEntry from './PunishmentEntry';
import GameEntry from './GameEntry';
import DareEntry from './DareEntry';
import PickingGame from './PickingGame';
import PlayingGame from './PlayingGame';
import PickingDare from './PickingDare';
import DoingDare from './DoingDare'
import OverScreen from './OverScreen';
import ResetScreen from './ResetScreen';

class GameDisplay extends React.Component {
    render(){
        const {gameState, playerName, forwardEvent, wipeState, resetGame} = this.props;
        return (
            <div className="h-100 w-100 ph2 flex flex-column justify-around">
                <Score players={gameState.players} score={gameState.score} stage={gameState.stage} />
                
                <PunishmentEntry playerName={this.props.playerName} gameState={this.props.gameState} forwardEvent={this.props.forwardEvent}/>
                <GameEntry playerName={this.props.playerName} gameState={this.props.gameState} forwardEvent={this.props.forwardEvent}/>
                <DareEntry playerName={this.props.playerName} gameState={this.props.gameState} forwardEvent={this.props.forwardEvent}/>
                <PickingGame playerName={this.props.playerName} gameState={this.props.gameState} forwardEvent={this.props.forwardEvent}/>
                <PlayingGame playerName={this.props.playerName} gameState={this.props.gameState} forwardEvent={this.props.forwardEvent}/>
                <PickingDare playerName={this.props.playerName} gameState={this.props.gameState} forwardEvent={this.props.forwardEvent}/>
                <DoingDare playerName={this.props.playerName} gameState={this.props.gameState} forwardEvent={this.props.forwardEvent}/>
                <OverScreen playerName={this.props.playerName} gameState={this.props.gameState} forwardEvent={this.props.forwardEvent}/>
                <ResetScreen wipeState={wipeState} gameState={gameState}/>
                <div className='flex justify-center pt5'>
                    <button onClick={resetGame}>Reset Game</button>
                </div>
            </div>
        )
    }
}

export default GameDisplay;
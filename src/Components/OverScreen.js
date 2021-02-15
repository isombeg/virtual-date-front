import '../App.css';
import React from 'react';

class OverScreen extends React.Component {
    stageName = 'over';
    render(){
        const {playerName, gameState, forwardEvent} = this.props;
        
        if(gameState.stage !== this.stageName) return null;
        
        if(gameState.winner == playerName) return (
            <div className='flex flex-column justify-center items-center'>
                <p>Congrats on winning {playerName}. Always knew you were capable of dusting them. Didn't doubt you for a second.</p>
                <p>Now your date must undergo the punishment you set at the beginning of the game:</p>
                <p className='f1'>{gameState.currentDare}</p>
                <button className="f6 grow no-underline br-pill pa5 pv2 ma3 dib white bg-hot-pink b--hot-pink" onClick={forwardEvent({event: 'reset'})}>End Game</button>
            </div>
        )
        return (
            <div className='flex flex-column justify-center items-center'>
                <p>Hahaha! You lost. Better luck next time. In the meantime, here's the punishment {gameState.winner} set for you.</p>
                <p className='f1'>{gameState.currentDare}</p>
            </div>
        )
    }
}

export default OverScreen;
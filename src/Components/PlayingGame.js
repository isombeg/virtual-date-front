import '../App.css';
import React from 'react';

class PlayingGame extends React.Component {
    stageName = 'playing_game';
    hafsaEvent = {
        event: 'game_played',
        payload: {
            name: 'Hafsa'
        }
    }
    gjEvent = {
        event: 'game_played',
        payload: {
            name: 'GJ'
        }
    }

    render(){
        const {playerName, gameState, forwardEvent} = this.props;
        
        if(gameState.stage !== this.stageName){
            return null;
        }
        
        return (
            <div className='flex flex-column justify-center items-center'>
                <p>You will now play {gameState.currentChallenge}</p>
                <div className='flex flex-column justify-center items-center'>
                    <p>Who won?</p>
                    <div className='flex justify-between'>
                        <button className='pv3 ph4 ma3 f6 grow no-underline br-pill pa5 pv2 ma3 dib white bg-hot-pink b--hot-pink' onClick={forwardEvent(this.hafsaEvent)}>Hafsa</button>
                        <button className='pv3 ph4 ma3 f6 grow no-underline br-pill pa5 pv2 ma3 dib white bg-hot-pink b--hot-pink' onClick={forwardEvent(this.gjEvent)}>GJ</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlayingGame;
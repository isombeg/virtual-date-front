import '../App.css';
import React from 'react';

class DoingDare extends React.Component {
    stageName = 'doing_dare';
    hafsaEvent = {
        event: 'dare_performed',
        payload: {
            name: 'Hafsa'
        }
    }
    gjEvent = {
        event: 'dare_performed',
        payload: {
            name: 'GJ'
        }
    }

    eventsByName = {
        'Hafsa': this.hafsaEvent,
        'GJ': this.gjEvent
    }

    render(){
        const {playerName, gameState, forwardEvent} = this.props;
        
        if(gameState.stage !== this.stageName) return null;

        if(gameState.daree === playerName) return (
            <div className='flex flex-column justify-center items-center'>
                <p>Since you lost the last challenge, please {gameState.currentDare} for your date :)</p>
                <p>They'll move the game along when they feel you've done it properly.</p>
            </div>
        )
        else return (
            <div className='flex flex-column justify-center items-center'>
                <p>{gameState.daree} will now {gameState.currentDare} as a dare for you.</p>
                <p>Please enjoy and click "Continue" when satisfied</p>
                <button className="f6 grow no-underline br-pill pa5 pv2 ma3 dib white bg-hot-pink b--hot-pink" onClick={forwardEvent(this.eventsByName[gameState.daree])}>Continue</button>
            </div>
        )
    }
}

export default DoingDare;
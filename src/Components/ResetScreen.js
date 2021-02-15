import '../App.css';
import React from 'react';

class ResetScreen extends React.Component {
    render(){
        if(!this.props.gameState || this.props.gameState.stage !== 'resetting') return null;
        
        this.props.wipeState()
        return (
            <div className='flex justify-center items-center'>
                <p className='h1'>Other player disconnected. Restarting the game shortly</p>
            </div>
        )

    }
}

export default ResetScreen;
import '../App.css';
import React from 'react';

class PickingGame extends React.Component {
    stageName = 'picking_game';
    constructor(props){
        super(props);
        this.state = {
            challengeSelected: null
        }

        this.shuffleGames = this.shuffleGames.bind(this);
        this.submitChoice = this.submitChoice.bind(this)
    }
    
    shuffleGames = (event) => {
        const challenges = this.props.gameState.challenges;
        this.setState({challengeSelected: challenges[Math.floor(Math.random() * challenges.length)]});
        event.preventDefault();
    }

    submitChoice = (event) => {
        this.props.forwardEvent({
            event: 'game_picked',
            payload: {
                name: this.props.playerName,
                challenge: this.state.challengeSelected
            }
        })();
        this.setState({challengeSelected: null})
        event.preventDefault();
    }
    
    render(){
        const {playerName, gameState, forwardEvent} = this.props;

        if(gameState.stage !== this.stageName){
            return null;
        }
        
        if(gameState.turn === playerName){
            if(!this.state.challengeSelected){
                return(
                    <form className='flex flex-column justify-center items-center' onSubmit={this.shuffleGames}>
                        <label>Spin for game you and your date will play by clicking but (or pressing Enter)</label>
                        <input className='mt2 f6 grow no-underline br-pill pa5 pv2 ma3 dib white bg-hot-pink b--hot-pink' type="submit" value="Spin For Game" />
                    </form>
                )  
            }
            else{
                return(
                    <form className='flex flex-column justify-center items-center' onSubmit={this.submitChoice}>
                        <p>You selected: {this.state.challengeSelected}</p>
                        <input className="f6 grow no-underline br-pill pa5 pv2 ma3 dib white bg-hot-pink b--hot-pink" type="submit" value="Continue" />
                    </form>
                )
            }
        }
        else{
            return (
                <div className='flex justify-center'>
                    <p>{gameState.turn} is choosing the challenge.</p>
                </div>
            )
        }
    }
}

export default PickingGame;
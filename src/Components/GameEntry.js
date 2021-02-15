import '../App.css';
import React from 'react';

class GameEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    stageName = 'game_entry';

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    handleSubmit = (event) => {
        if(this.state.value){
            this.props.forwardEvent({
                event: 'game_entered',
                payload: {
                    challenge: this.state.value
                }
            })();
        }
        
        this.setState({value: ''})
        event.preventDefault();
    }

    render(){
        const {playerName, gameState, forwardEvent} = this.props;

        if(gameState.stage !== this.stageName){
            return null;
        }

        const entryForm = (
            <div className='w-60'>
                <form onSubmit={this.handleSubmit}>
                    <div className='flex justify-center'>
                        <label className="f6 b db mb2" for="gameInput">Enter at least 11 games (in total) you and your date should play:</label><br/>
                        <input className="input-reset ba b--black-20 pa2 mb2 db w-100 o-60 bg-pink" type="text" id="gameInput" name="gameInput" value={this.state.value} onChange={this.handleChange}/><br/>
                    </div>
                    <div className='flex justify-between mt4'>
                        <input className={"f6 grow no-underline br-pill pa5 pv2 ma3 dib white bg-hot-pink b--hot-pink" + (this.state.value.length ? "" : ' o-40')} type="submit" value="Submit Game" disabled={!this.state.value.length}/>
                        <button
                            className={"f6 grow no-underline br-pill pa5 pv2 ma3 dib white bg-hot-pink b--hot-pink" + (gameState.challenges.length < 11 ? ' o-40' : '')}
                            onClick={forwardEvent({
                                    event: 'player_ready',
                                    payload: {
                                        name: playerName
                                    }
                                })
                            }
                            disabled={gameState.challenges.length < 11}
                        >
                            Done Submitting
                        </button>
                    </div>
                </form>
            </div>
            
        )
        
        const addedGames = (
            <ul className='w-35 list pl0'>
                <div className='flex flex-column justify-center items-center'>
                    {gameState.challenges.length ? (<h1>Submitted Challenges ({gameState.challenges.length})</h1>) : null}
                    {gameState.challenges.map(challenge => <li>{challenge}</li>)}
                </div>
            </ul>
        )

        if(gameState.readyPlayer){
            if(gameState.readyPlayer === playerName){
                return (
                    <div className='flex flex-column items-center justify-around'>
                        <p>I'm so sorry you gotta wait for this person. On Valentine's day too ?? Chile ...</p>
                        {addedGames}
                    </div>
                )
            }
            else{
                return (
                    <div className='flex flex-column items-center justify-around'>
                        <p>Quit being a slowpoke. {gameState.readyPlayer} is waiting on you to finish entering.</p>
                        <div className='flex justify-around items-center'>
                            {entryForm}
                            {addedGames}
                        </div>
                        
                    </div>
                )
            }
        }

        return (
            <div className='flex justify-around items-center'>
                {entryForm}
                {addedGames}
            </div>
        )
    }
}

export default GameEntry;
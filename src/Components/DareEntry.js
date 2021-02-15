import '../App.css';
import React from 'react';

class DareEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    stageName = 'dare_entry';

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    handleSubmit = (event) => {
        if(this.state.value){
            this.props.forwardEvent({
                event: 'dare_entered',
                payload: {
                    dare: this.state.value
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
                        <label className="f6 b db mb2" for="dareInput">Input at least 11 dares (in total) you're ready to see your date (and potentially yourself) do: </label><br/>
                        <input className="input-reset ba b--black-20 pa2 mb2 db w-100 o-60 bg-pink" type="text" id="dareInput" name="dareInput" value={this.state.value} onChange={this.handleChange}/><br/>
                    </div>
                    <div className='flex justify-between mt4'>
                        <input className="f6 grow no-underline br-pill pa5 pv2 ma3 dib white bg-hot-pink b--hot-pink" type="submit" value="Submit" disabled={!this.state.value.length}/>
                        <button 
                            className="f6 grow no-underline br-pill pa5 pv2 ma3 dib white bg-hot-pink b--hot-pink"
                            onClick={forwardEvent({
                                    event: 'player_ready',
                                    payload: {
                                        name: playerName
                                    }
                                })
                            }
                            disabled={gameState.dares.length < 11}
                        >
                            Done Submitting
                        </button>
                    </div>
                </form>
            </div>
            
        )
        
        const addedDares = (
            <ul className='w-35 list pl0'>
                <div className='flex flex-column justify-center items-center'>
                    {gameState.dares.length ? (<h1>Submitted Dares ({gameState.dares.length})</h1>) : null}
                    {gameState.dares.map(dare => <li>{dare}</li>)}
                </div>
            </ul>
        )

        if(gameState.readyPlayer){
            if(gameState.readyPlayer === playerName){
                return (
                    <div className='flex flex-column items-center justify-around'>
                        <p>Damn, can you let them know they can finish anyday now ???</p>
                        {addedDares}
                    </div>
                )
            }
            else{
                return (
                    <div className='flex flex-column items-center justify-around'>
                        <p>Like today? {gameState.readyPlayer} BEEN done.</p>
                        <div className='flex justify-around items-center'>
                            {entryForm}
                            {addedDares}
                        </div>
                    </div>
                )
            }
        }

        return (
            <div className='flex justify-around items-center'>
                {entryForm}
                {addedDares}
            </div>
        )
    }
}

export default DareEntry;
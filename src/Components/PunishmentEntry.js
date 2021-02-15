import '../App.css';
import React from 'react';

class PunishmentEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.stageName = 'punishment_entry'

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    handleSubmit = (event) => {
        console.log('punish_entered')
        this.props.forwardEvent({
            event: 'punish_entered',
            payload: {
                name: this.props.playerName,
                punishment: this.state.value
            }
        })();
        event.preventDefault();
    }
    
    render(){
        const {playerName, gameState, forwardEvent} = this.props;
        if(gameState.stage !== this.stageName){
            return null;
        }
        const entryForm = (
            <form className='flex flex-column justify-around items-center' onSubmit={this.handleSubmit}>
                <label className="f6 b db mb2" for="punishment">
                    Set your opponent's punishment should they lose: 
                    <input className="input-reset ba b--black-20 pa2 mb2 db w-100 o-60 bg-pink mt3" type="text" id="punishment" name="punishment" value={this.state.value} onChange={this.handleChange}/><br/>
                </label>
                <div className='center-contents mt3'>
                    <input type="submit" value="Submit" className="f6 grow no-underline br-pill ba bw2 ph3 pv2 mb2 dib hot-pink b--hot-pink" disabled={!this.state.value.length}/>
                </div>
            </form>
        )

        if(gameState.readyPlayer !== null){
            console.log('readyPlayer', gameState.readyPlayer, 'playerName', playerName)
            if(gameState.readyPlayer === playerName){
                return (
                    <div className='flex justify-center'>
                        <p>Waiting on that slowpoke to finish entering your punishment. Probably gonna be spicy though.</p>
                    </div>
                )
            }
            else{
                return (
                    <div>
                        <p className='flex justify-center'>Quit being a slowpoke. {gameState.readyPlayer} is waiting on you to finish entering.</p>
                        {entryForm}
                    </div>
                )
            }
        }

        return entryForm;
    }
}

export default PunishmentEntry;
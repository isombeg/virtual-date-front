import '../App.css';
import React from 'react';

class PickingDare extends React.Component {
    stageName = 'picking_dare';
    constructor(props){
        super(props);
        this.state = {
            dareSelected: null
        }

        this.shuffleDares = this.shuffleDares.bind(this);
        this.submitChoice = this.submitChoice.bind(this)
    }
    
    shuffleDares = (event) => {
        const dares = this.props.gameState.dares;
        this.setState({dareSelected: dares[Math.floor(Math.random() * dares.length)]});
        event.preventDefault();
    }

    submitChoice = (event) => {
        this.props.forwardEvent({
            event: 'dare_picked',
            payload: {
                name: this.props.playerName,
                dare: this.state.dareSelected
            }
        })();
        this.setState({dareSelected: null});
        event.preventDefault();
    }
    
    render(){
        const {playerName, gameState, forwardEvent} = this.props;

        if(gameState.stage !== this.stageName){
            return null;
        }

        if(gameState.daree === playerName){
            if(!this.state.dareSelected){
                return(
                    <form className='flex flex-column justify-center items-center' onSubmit={this.shuffleDares}>
                        <label>Spin for dare you will perform for your date's pleasure by clicking but (or pressing Enter)</label>
                        <input className="f6 grow no-underline br-pill pa5 pv2 ma3 dib white bg-hot-pink b--hot-pink mt2" type="submit" value="Spin For Dare" />
                    </form>
                )  
            }
            else{
                return(
                    <form className='flex flex-column justify-center items-center' onSubmit={this.submitChoice}>
                        <p>You selected: {this.state.dareSelected}</p>
                        <input className="f6 grow no-underline br-pill pa5 pv2 ma3 dib white bg-hot-pink b--hot-pink mt2" type="submit" value="Continue" />
                    </form>
                )
            }
        }
        else{
            return (
                <div className='flex flex-column justify-center items-center'>
                    <p>{gameState.daree} is choosing the dare to perform for your enjoyment.</p>
                </div>
            )
        }
    }
}

export default PickingDare;
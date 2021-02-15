import '../App.css';
import React from 'react';

class PlayerEntry extends React.Component {
    
    render(){
        console.log(this.props);
        const {forwardEvent, takenPlayers, setPlayer, playerName} = this.props;

        if(playerName){
            return (
                <p>Waiting on other player to enter</p>
            )
        }
        return (
            <div>
                <p>Welcome to your valentine's day date. Who are you?</p><br/>
                <div className="center-contents">
                    <input
                        type="button"
                        className={"f6 grow no-underline br-pill pa5 pv2 ma3 dib white bg-hot-pink b--hot-pink" + (takenPlayers !== null && takenPlayers[0]==='Hafsa' ? ' o-30': '')}
                        onClick={() => {
                                forwardEvent({event: 'player_entered', payload: {name: 'Hafsa'}})();
                                setPlayer('Hafsa')
                            }
                        }
                        disabled={takenPlayers !== null && takenPlayers[0]==='Hafsa'}
                        value="Hafsa"
                        />
                    <input
                        type="button"
                        className={"f6 grow no-underline br-pill pa5 pv2 ma3 dib white bg-hot-pink b--hot-pink" + (takenPlayers !== null && takenPlayers[0]==='GJ' ? ' o-30': '')}
                        onClick={() => {
                                forwardEvent({event: 'player_entered', payload: {name: 'GJ'}})();
                                setPlayer('GJ')
                            }
                        }
                        disabled={takenPlayers !== null && takenPlayers[0]==='GJ'}
                        value="GJ"
                        />
                </div>
            </div>
        )
    }
}

export default PlayerEntry;
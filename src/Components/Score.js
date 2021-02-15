import '../App.css';
import React from 'react';

class Score extends React.Component{
    render(){
        const {players, score, stage} = this.props;
        if(!['player_entry', 'punishment_entry', 'game_entry', 'dare_entry', 'resetting'].includes(stage)){
            return (
                <div className='flex justify-around'>
                    <div className="flex flex-column justify-center items-center">
                        <h1 className="f1 mb0">{score[0]}</h1>
                        <h3 className="f4 mt1">{players[0]}</h3>
                    </div>
                    <div className="flex flex-column justify-center items-center">
                        <h1 className="f1 mb0">{score[1]}</h1>
                        <h3 className="f4 mt1">{players[1]}</h3>
                    </div>
                </div>
            )
        }
        return (<div></div>)
    }
}

export default Score
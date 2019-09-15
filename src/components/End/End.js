import React, { Component } from 'react';
import "./end.css"
class End extends Component {

    newGame=()=>{
        this.props.newGame()
    }

    render() {
        console.log('sds');
        
        return (
            <div className="message">
                <div className="score">Your Score is <br></br> {this.props.score}</div>
                <div id="button" className="waves-effect waves-light btn-large" onClick={this.newGame}>Start A New Game!</div>
                
            </div>
        );
    }
}

export default End;
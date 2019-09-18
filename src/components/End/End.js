import React, { Component } from 'react';
import "./end.css"
class End extends Component {

    constructor() {
        super()
        this.state = {
            name:""
        }
    }

    handleInput=(e)=>{
        let newName = e.target.value
        this.setState({
            name: newName
        })
    }

    newGame = () => {
        this.props.newGame()
    }

    saveScore = () => {
        if(this.state.name == ""){
            alert("Please Enter Your Name")
        }
        localStorage.bestScore2 = this.props.score;
        localStorage.name = this.state.name; 
        this.props.newGame()
    }

    bestScore = () => {
        console.log(localStorage.bestScore2);
        
       if(!localStorage.bestScore2 ||  JSON.parse(localStorage.bestScore2) < this.props.score ){

        return (
            <div>
                <div className="winMessage">You broke the record!</div>
                <div className="saveText">
                <div>Want to keep your record?</div>
                <div>Please enter your name</div>
                </div>
                <input type="text" className="input" value={this.state.name} onInput={this.handleInput} placeholder="Your Name"></input><button id="save" className="waves-effect waves-light btn-large" onClick={this.saveScore}>Save Score</button>
            </div>
        )
       } else {
           return(
               <div className="best"> Top record: {localStorage.name} earned {localStorage.bestScore2} Points</div>
           )
       }
        

    }

    render() {

        return (
            <div className="message">
                <div className="score">Your Score is <br></br> {this.props.score}</div>
                <div>{this.bestScore()}</div>
    
                <button id="button" className="waves-effect waves-light btn-large" onClick={this.newGame}>Start A New Game!</button>

            </div>
        );
    }
}

export default End;
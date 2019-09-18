import React, { Component } from 'react';
import "./artist.css"
class Artist extends Component {


    guessAnswer=()=>{
        this.props.guessAnswer(this.props.artist.artist)  
      }


    render() {
        return (
            <button 
            className="waves-effect waves-light btn-large" onClick={this.guessAnswer} 
            id={this.props.artist.id}>
               {this.props.artist.artist} 
            </button>
        );
    }
}

export default Artist;
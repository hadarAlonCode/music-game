import React, { Component } from 'react';
import Artist from '../Artist/Artist.js';
import "./artists.css"
class Artists extends Component {

    render() {
        return (
            <div className="artistsSection">
              {this.props.randomArtists.map(a => <Artist key={a.id} artist={a} guessAnswer={this.props.guessAnswer} /> )}  
            </div>
        );
    }
}

export default Artists;
import React, { Component } from 'react';
import "./albums.css"
class Albums extends Component {
    render() {
        return (
            <div>
               <img className="albumImg" src={this.props.correctAns.img} alt="album" /> 
            </div>
        );
    }
}

export default Albums;
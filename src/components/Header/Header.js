import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div>
               <div className="round"><span className="roundNum">Round <br></br> {this.props.round} </span></div>
            </div>
        );
    }
}

export default Header;
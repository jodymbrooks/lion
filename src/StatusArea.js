import React, { Component } from 'react';
import './App.css';

class StatusArea extends Component {
    render() {
        return (
            <div className="StatusArea">
                <div>Sets: <span className="sets">{this.props.sets}</span></div>
                <div>Points: <span className="points">{this.props.points}</span></div>
            </div>
        );
    }
}

export default StatusArea;

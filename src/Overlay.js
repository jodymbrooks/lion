import React, { Component } from 'react';
import './App.css';

class Overlay extends Component {
    render() {

        return (
            <div className="Overlay" style={{ display: this.props.shown ? 'block' : 'none' }} />
        );
    }
}

export default Overlay;

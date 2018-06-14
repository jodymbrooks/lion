import React, { Component } from 'react';
import Table from './Table';
import './App.css';

class App extends Component {




    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">BOLD - The Card Game</h1>
                </header>
                <Table/>
            </div>
        );
    }
}

export default App;

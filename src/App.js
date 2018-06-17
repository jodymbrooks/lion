import React, { Component } from 'react';
import Table from './Table';
import './App.css';
import StatusArea from './StatusArea';
import { createStore } from 'redux';



class App extends Component {

    scoreStore = null;

    // a "reducer" that handle some events and return a state
    scoreReducer(scoreState = {}, action) {
        var newState = { ...scoreState };

        if (action.type === 'INCREMENT') {
            if (typeof (action.sets) !== "undefined") {
                newState.sets += action.sets;
            }
            if (typeof (action.points) !== "undefined") {
                newState.points += action.points;
            }
            if (typeof (action.possPoints) !== "undefined") {
                newState.possPoints += action.possPoints;
            }
        }
        else if (action.type === 'SET') {
            if (typeof (action.sets) !== "undefined") {
                newState.sets = action.sets;
            }
            if (typeof (action.points) !== "undefined") {
                newState.points = action.points;
            }
            if (typeof (action.possPoints) !== "undefined") {
                newState.possPoints = action.possPoints;
            }
            if (typeof (action.matchingAttrs) !== "undefined") {
                newState.matchingAttrs = action.matchingAttrs;
            }
        }
        else if (action.type === 'KEEP') {
            if (typeof (newState.possPoints) !== "undefined") {
                newState.points += newState.possPoints;
            }
            newState.possPoints = 0;
            newState.matchingAttrs = [];
        }

        return newState;
    }

    constructor(props) {
        super(props);

        var initialStoreState = {
            sets: 0,
            points: 0,
            possPoints: 0,
            matchingAttrs: []
        };

        this.scoreStore = createStore(this.scoreReducer.bind(this), initialStoreState);
    }



    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">BOLD - The Card Game</h1>
                    <StatusArea scoreStore={this.scoreStore} />
                </header>
                <Table scoreStore={this.scoreStore} />
            </div>
        );
    }
}

export default App;

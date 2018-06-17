import React, { Component } from 'react';
import Table from './Table';
import './App.css';
import StatusArea from './StatusArea';
import { createStore } from 'redux';



class App extends Component {

    scoreStore = null;

    // a "reducer" that handle some events and return a state
    scoreReducer(scoreState = {}, action) {
        //return action.type === 'INCREMENT' ? state + 1
        //    : action.type === 'DECREMENT' ? state - 1
        //        : state;



        if (action.type === 'INCREMENT') {
            if (typeof (action.sets) !== "undefined") {
                scoreState.sets += action.sets;
            }
            if (typeof (action.points) !== "undefined") {
                scoreState.points += action.points;
            }
            if (typeof (action.possPoints) !== "undefined") {
                scoreState.possPoints += action.possPoints;
            }
        }
        else if (action.type === 'SET') {
            if (typeof (action.sets) !== "undefined") {
                scoreState.sets = action.sets;
            }
            if (typeof (action.points) !== "undefined") {
                scoreState.points = action.points;
            }
            if (typeof (action.possPoints) !== "undefined") {
                scoreState.possPoints = action.possPoints;
            }
            if (typeof (action.matchingAttrs) !== "undefined") {
                scoreState.matchingAttrs = action.matchingAttrs.join(", ");
            }
        }

        return scoreState;
    }

    constructor(props) {
        super(props);

        this.scoreStore = createStore(this.scoreReducer.bind(this));
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

import React, { Component } from 'react';
import './App.css';

class StatusArea extends Component {

    state = {
        sets: 0,
        points: 0,
        possPoints: 0,
        matchingAttrs: []
    }

    constructor(props) {
        super(props);

        if (!this.props.scoreStore) {
            throw "The scoreStore must be passed to this component";
        }

        this.props.scoreStore.subscribe(this.scoreUpdate.bind(this));

        //this.state = { ...this.props };
    }

    scoreUpdate() {
        var scoreState = this.props.scoreStore.getState();
        console.log("StatusArea.scoreUpdate: scoreState: ");
        console.log(scoreState);

        if (typeof (scoreState.sets) !== "undefined" ||
            typeof (scoreState.points) !== "undefined" ||
            typeof (scoreState.possPoints) !== "undefined")
        {
            this.setState(scoreState);
        }
    }

    render() {
        return (
            <div className="StatusArea">
                <div className="statusSection setsArea">
                    <span className="statusTitle">Sets: </span><span className="statusCount">{this.state.sets}</span>
                </div>
                <div className="statusSection pointsArea">
                    <span className="statusTitle">Points: </span><span className="statusCount">{this.state.points}</span>
                </div>
                <div className="statusSection possPointsArea">
                    <span className="statusTitle">Possible Points: </span><span className="statusCount">{this.state.possPoints}</span>
                    <button id="keepButton">Keep</button>
                </div>
                <div className="statusSection matchingAttrsArea">
                    <span className="statusTitle">Matches: </span><span className="matchingAttrs">{this.state.matchingAttrs.join(", ")}</span>
                </div>
            </div>
        );
    }
}

export default StatusArea;

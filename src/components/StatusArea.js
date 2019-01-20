import React, { Component } from "react";
import { connect } from "react-redux";
import "../App.css";
import SharedStatus from "./SharedStatus";
import UserScore from "./UserScore";

class StatusArea extends Component {
  getUserScores() {
    const userScores = this.props.score.userScores.map((userScore, index) => {
      const { user, sets, points } = userScore;
      const isActive = this.props.score.activeUserIndex === index;
      return (
        <UserScore
          key={index}
          index={index}
          user={user}
          sets={sets}
          points={points}
          isActive={isActive}
        />
      );
    });

    return userScores;
  }

  render() {
    const userScores = this.getUserScores();

    return (
      <div className="StatusArea">
        <SharedStatus />
        {userScores}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    common: state.common,
    score: state.score
  };
}

export default connect(mapStateToProps)(StatusArea);

import React, { Component } from "react";
import { connect } from "react-redux";

import "../App.css";
import Card from "./Card";
import Overlay from "./Overlay";
import { dealCards } from "../actions/cardsActions";

class Table extends Component {
  constructor(props) {
    super(props);

    this.cards = null;

    if (!this.props.deckCards) {
      this.props.dispatch(dealCards());
    }
  }

  getCards = () => {
    this.cards = [];

    this.props.cards.tableCards.forEach((cardInfo, index) => {
      let card = null;

      if (cardInfo) {
        const { key, attrs, faceDown } = cardInfo;

        if (attrs && attrs.length === 4) {
          card = (
            <div key={index + "." + key} className="Table_grid_item">
              <Card
                cardKey={key}
                attr1={attrs[0]}
                attr2={attrs[1]}
                attr3={attrs[2]}
                attr4={attrs[3]}
                faceDown={faceDown}
              />
            </div>
          );
        }
        // else {
        //   // console.log("cardInfo @ index " + index + " = ");
        //   // console.log(cardInfo);
        // }
      }

      if (!card) {
        card = (
          <div key={index + ".empty"} className="Table_grid_item">
            <Card isEmpty={true} />
          </div>
        );
      }

      this.cards.push(card);
    });
  };

  render() {
    this.getCards();

    if (this.props.cards.gameOver) {
      const { userScores } = this.props.score;
      const winnerIndex =
        userScores[0].points > userScores[1].points
          ? 0
          : userScores[0].points < userScores[1].points
          ? 1
          : null;
      const winnerMessage =
        winnerIndex === null
          ? "It's a tie!"
          : userScores[winnerIndex].user +
            " won with " +
            userScores[winnerIndex].points +
            " points!";

      return (
        <div className="Table">
          <Overlay />
          <div className="game-over-message">
            Congratulations!
            <br />
            {winnerMessage}
          </div>
          <button
            className="ui button primary new-game-button"
            onClick={() => {
              document.location.reload();
            }}
          >
            New Game
          </button>
        </div>
      );
    }
    // else ...

    return (
      <div className="Table">
        <Overlay />
        <div className="Table_grid">{this.cards}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    score: state.score,
    cards: state.cards
  };
}

export default connect(mapStateToProps)(Table);

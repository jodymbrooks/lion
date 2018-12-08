import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { keepScoreAndFollowUp, testRemoveBunchOfCardsAndFollowUp } from '../actions/scoreActions';

class StatusArea extends Component {
  onClearButtonClick(/*event*/) {
    this.props.dispatch(testRemoveBunchOfCardsAndFollowUp());
  }

  onKeepButtonClick(/*event*/) {
    this.props.dispatch(keepScoreAndFollowUp());
  }

  render() {
    const { sets, points, possPoints, matchingAttrs } = this.props.score;
    const matchingAttrsString = matchingAttrs ? matchingAttrs.join(', ') : '';
    const cardsLeft = this.props.score.deckCards.length;
    return (
      <div className='StatusArea'>

        <div className='status-section setsArea'>
          <span className='statusTitle ui label'>Sets: </span><span className='status-count ui basic label'>{sets}</span>
        </div>
        <div className='status-section points-area'>
          <span className='statusTitle ui label'>Points: </span><span className='status-count ui basic label'>{points}</span>
        </div>
        <div className='status-section posspoints-area'>
          <span className='statusTitle ui label'>Possible Points: </span>
          <div className=''>
            <button className='ui button primary keep-button' tabIndex='0' disabled={possPoints === 0} onClick={this.onKeepButtonClick.bind(this)}>
              Keep
            </button>
            <span className='status-count ui basic label'>{possPoints}</span>
          </div>
        </div>
        <div className='status-section cards-area'>
          <span className='statusTitle ui label'>Cards Left: </span><span className='status-count ui basic label'>{cardsLeft}</span>
        </div>
        <div className='status-section matching-attrs-area'>
          <span className='statusTitle ui label'>Matches: </span><span className='matching-attrs ui label'>{matchingAttrsString}</span>
        </div>

        <button className='ui button primary' tabIndex='0' onClick={this.onClearButtonClick.bind(this)}>
          Clear table
        </button>

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

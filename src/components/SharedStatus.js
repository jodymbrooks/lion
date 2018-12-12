import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { keepScoreAndFollowUp } from '../actions/scoreActions';

class SharedStatus extends Component {
  onKeepButtonClick(/*event*/) {
    this.props.dispatch(keepScoreAndFollowUp());
  }

  render() {
    const { possPoints, matchingAttrs } = this.props.score;
    const matchingAttrsString = matchingAttrs ? matchingAttrs.join(', ') : '';
    const cardsLeft = this.props.score.deckCards.length;
    return (
      <div className='SharedStatus'>
        <div className='status-section cards-area'>
          <span className='statusTitle ui label'>Cards Left: </span><span className='status-count ui basic label'>{cardsLeft}</span>
        </div>
        <div className='status-section posspoints-area'>
          <span className='statusTitle ui label'>Possible Points: </span>
          <div className=''>
            <button className='ui button primary keep-button' tabIndex='0' disabled={possPoints === 0} title='Keep the possible points. Also you can click on a flipped up card in the set to keep them.' onClick={this.onKeepButtonClick.bind(this)}>
              Keep
            </button>
            <span className='status-count ui basic label'>{possPoints}</span>
          </div>
        </div>
        <div className='status-section matching-attrs-area'>
          <span className='statusTitle ui label'>Matches: </span><span className='matching-attrs ui label'>{matchingAttrsString}</span>
        </div>
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

export default connect(mapStateToProps)(SharedStatus);

import React from 'react';
import { connect } from 'react-redux';
import '../App.css';

function StatusArea(props) {
  const { sets, points, possPoints, matchingAttrs } = props.score;
  const matchingAttrsString = matchingAttrs ? matchingAttrs.join(', ') : '';
  return (
    <div className='StatusArea'>
      <div className='statusSection setsArea'>
        <span className='statusTitle'>Sets: </span><span className='statusCount'>{sets}</span>
      </div>
      <div className='statusSection pointsArea'>
        <span className='statusTitle'>Points: </span><span className='statusCount'>{points}</span>
      </div>
      <div className='statusSection possPointsArea'>
        <span className='statusTitle'>Possible Points: </span>
        <div className='ui right labeled button' role='button' tabIndex='0'>
          <button className='ui icon button' disabled={possPoints === 0}>
            <i aria-hidden='true' className='thumbs up icon' />Keep
          </button>
          <a className='ui left pointing basic label'>{possPoints}</a>
        </div>




      </div>
      <div className='statusSection matchingAttrsArea'>
        <span className='statusTitle'>Matches: </span><span className='matchingAttrs'>{matchingAttrsString}</span>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    common: state.common,
    score: state.score
  };
}

export default connect(mapStateToProps)(StatusArea);

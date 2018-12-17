import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import '../App.css';
import { updatePlayerName } from '../actions/scoreActions';

class UserScore extends Component {
  userInputChange(event) {
    this.props.dispatch(updatePlayerName(event.currentTarget.value, this.props.index));
  }

  render() {
    const { user, sets, points, isActive } = this.props;
    return (
      <div className='UserScore' data-isactive={isActive}>

        <div className='status-section userArea' >
          <div className="ui input">
            <input type="text" value={user} onChange={this.userInputChange.bind(this)}/>
          </div>
        </div>
        <div className='status-section setsArea'>
          <span className='statusTitle ui label'>Sets: </span><span className='status-count ui basic label'>{sets}</span>
        </div>
        <div className='status-section points-area'>
          <span className='statusTitle ui label'>Points: </span><span className='status-count ui basic label'>{points}</span>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isActive } = this.props;
    if (isActive) {
      const domNode = ReactDOM.findDOMNode(this);
      window.setTimeout(() => {
        domNode.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
      }, 100);
    }
  }
}

function mapStateToProps(state) {
  return {
    common: state.common,
    score: state.score
  };
}

export default connect(mapStateToProps)(UserScore);

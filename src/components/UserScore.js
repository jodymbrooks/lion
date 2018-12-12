import React, { Component } from 'react';
import '../App.css';

class UserScore extends Component {
  render() {
    const { user, sets, points, isActive } = this.props;
    return (
      <div className='UserScore' data-isactive={isActive}>

        <div className='status-section userArea' >
          <span className='statusTitle ui label'>{user}</span>
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

}

export default UserScore;

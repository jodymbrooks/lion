import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isActive } = this.props;
    console.log("componentDidUpdate: isActive=" + isActive);
    if (isActive) {
      const domNode = ReactDOM.findDOMNode(this);
      console.log("componentDidUpdate: domNode=");
      console.log(domNode);
      window.setTimeout(() => {
      domNode.scrollIntoView({behavior: "smooth", block: "end", inline: "end"});
    },100);
    }
  }
}

export default UserScore;

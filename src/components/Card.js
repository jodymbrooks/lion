import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../App.css';
import utilities from '../utilities';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null,
      color: utilities.colorPropToState(this.props.color),
      size: utilities.sizePropToState(this.props.size),
      container: utilities.containerPropToState(this.props.container),
      pattern: utilities.patternPropToState(this.props.pattern),
      faceDown: true,
      backgroundColor: "black",
      highlight: "highlight-none"
    };

    this.state.key = utilities.GetKey(this.state.color.index, this.state.size.index, this.state.container.index, this.state.pattern.index);
  }


  //componentDidUpdate() {
  //    console.log("componentDidUpdate: " + this.state.key);
  //}

  componentWillReceiveProps(nextProps) {
      var stateChanges = {};
      var count = 0;

      // Handle face down or up
      var faceDown = (nextProps.cardKeyJustShown === this.props.cardKey ? false :
                      nextProps.cardKeyJustHid === this.props.cardKey ? true :
                      null);

      if (faceDown !== null && faceDown !== this.state.faceDown) {
          stateChanges['faceDown'] = faceDown;
          count++;
          stateChanges['backgroundColor'] = faceDown ? "black" : this.state.color.value;
      }

      // Handle highlight if face up
      if (nextProps.highlight !== this.state.highlight) {
          stateChanges['highlight'] = nextProps.highlight;
          count++;
      }


      if (count > 0) {
          this.setState(stateChanges);
      }

      //if (this.state.faceDown && nextProps.cardKeyJustShown == this.props.cardKey    // IF I'm face down but I'm the card just shown
      //    || !this.state.faceDown && nextProps.highlight != this.state.highlight // OR I'm face up and I have a new highlight
      //    || !this.state.faceDown && nextProps.cardKeyJustHid == this.props.cardKey) // OR I'm face up and I'm the card just hid
      //{                                                                               // THEN update my state to force my re-render
      //    this.setState({faceDown: false, highlight: this.props.highlight})
      //}
      //facedown = { faceDown } cardKeyJustShown = { this.state.cardKeyJustShown }, cardKeyJustHid = { this.state.cardJustHid } highlight = { this.state.highlight } 
  }




  render() {
    //console.log("render: " + this.state.key);
    const { color, size, container, pattern } = this.state;

    return (
      <div className={"Card " + this.state.highlight} data-key={this.state.key} data-facedown={this.state.faceDown} style={{ backgroundColor: this.state.backgroundColor }}>
        <div className="cardback">
        </div>
        <div className="cardface">
          <div>
            {color.index} {color.name}<br />
            {size.index} {size.name}<br />
            {container.index} {container.name}<br />
            {pattern.index} {pattern.name}<br />
          </div>
        </div>
      </div >
    );
  }
}

function mapStateToProps(state) {
  return {
    common: state.common,
    score: state.score
  };
}

export default connect(mapStateToProps)(Card);

import React, { Component } from 'react';
import { connect } from 'react-redux';
// import FlipCard from 'react-flipcard-2';

import '../App.css';
import { cardFlipped } from '../actions/scoreActions';
import utilities from '../utilities';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: utilities.decodeColor(props.color),
      size: utilities.decodeSize(props.size),
      container: utilities.decodeContainer(props.container),
      pattern: utilities.decodePattern(props.pattern),
      faceDown: true,
    };
  }

  handleClick = () => {
    this.setState({ faceDown: !this.state.faceDown });

    this.props.dispatch(cardFlipped(this.props.cardKey));
  }

  render() {
    const { color, size, container, pattern, /*backgroundColor,*/ faceDown } = this.state;
    const { /*cardKey,*/ highlight } = this.props;
    const faceDescription = `${color.name} ${size.name} ${container.name} on ${pattern.name}`;
    // <FlipCard flipped={!faceDown} disabled={true}>
    // </FlipCard>

    let alt = "card back";
    let imgSrc = "/images/cards/CardBackWithOrange.png";

    if (!faceDown) {
      alt = faceDescription;
      // imgSrc = `/images/cards/${cardKey}.png`;
      imgSrc = "/images/cards/CardFaceBlank.png";
    }

    if (faceDown) {
      return (
        <div className={"Card " + highlight} data-facedown={faceDown} onClick={this.handleClick}>
          <img src={imgSrc} alt={alt} />
        </div >
      );
    }
    // else ...
    return (
      <div className={"Card " + highlight} data-facedown={faceDown} onClick={this.handleClick}>
        <img src={imgSrc} alt={alt} />
        <div className='ui bottom attached label'>{faceDescription}</div>
      </div >
    );
  }
}

function mapStateToProps(state) {
  return {
    common: state.common,
    highlight: state.score.highlight
  };
}

export default connect(mapStateToProps)(Card);

import React, { Component } from 'react';
import './App.css';

class Card extends Component {
    state = {
        key: null,
        color: { index: null, name: null, value: null },
        size: { index: null, name: null },
        container: { index: null, name: null },
        pattern: { index: null, name: null },
        faceDown: true
    };

    static colors = ['orange', 'teal', 'yellow'];
    static colorMap = { 'orange': '#FF752D', 'teal': '#02A4B7', 'yellow': '#D1BC13' };
    static sizes = ['small', 'medium', 'large'];
    static patterns = ['stripes', 'dots', 'stars'];
    static containers = ['jug', 'bottle', 'cup'];

    static GetKey(color, size, container, pattern) {
        return "Card" + color + size + container + pattern;
    }

    constructor(props) {
        super(props);

        this.state.color = this.colorPropToState(this.props.color);
        this.state.size = this.sizePropToState(this.props.size);
        this.state.container = this.containerPropToState(this.props.container);
        this.state.pattern = this.patternPropToState(this.props.pattern);

        this.state.key = Card.GetKey(this.state.color.index, this.state.size.index, this.state.container.index, this.state.pattern.index);
    }

    colorPropToState(colorProp) {
        var color = {
            index: null,
            name: null,
            value: null
        };

        var colorName;

        if (typeof (colorProp) === "string") {
            var colorIndex = Card.colors.indexOf(colorProp.toLowerCase());
            if (colorIndex !== -1) {
                colorName = Card.colors[colorIndex]; // get it from the array so it's normalized
                color = {
                    index: colorIndex,
                    name: colorName,
                    value: Card.colorMap[colorName]
                }
            }
        } else if (typeof (colorProp === "number")) {
            colorName = Card.colors[colorProp];
            if (typeof (colorName) !== "undefined") {
                color = {
                    index: colorProp,
                    name: colorName,
                    value: Card.colorMap[colorName]
                }
            }
        }

        return color;
    }

    sizePropToState(sizeProp) {
        var size = {
            index: null,
            name: null
        };

        var sizeName;

        if (typeof (sizeProp) === "string") {
            var sizeIndex = Card.sizes.indexOf(sizeProp.toLowerCase());
            if (sizeIndex !== -1) {
                sizeName = Card.sizes[sizeIndex]; // get it from the array so it's normalized
                size = {
                    index: sizeIndex,
                    name: sizeName
                }
            }
        } else if (typeof (sizeProp === "number")) {
            sizeName = Card.sizes[sizeProp];
            if (typeof (sizeName) !== "undefined") {
                size = {
                    index: sizeProp,
                    name: sizeName
                }
            }
        }

        return size;
    }

    containerPropToState(containerProp) {
        var container = {
            index: null,
            name: null
        };

        var containerName;

        if (typeof (containerProp) === "string") {
            var containerIndex = Card.containers.indexOf(containerProp.toLowerCase());
            if (containerIndex !== -1) {
                containerName = Card.containers[containerIndex]; // get it from the array so it's normalized
                container = {
                    index: containerIndex,
                    name: containerName
                }
            }
        } else if (typeof (containerProp === "number")) {
            containerName = Card.containers[containerProp];
            if (typeof (containerName) !== "undefined") {
                container = {
                    index: containerProp,
                    name: containerName
                }
            }
        }

        return container;
    }

    patternPropToState(patternProp) {
        var pattern = {
            index: null,
            name: null
        };

        var patternName;

        if (typeof (patternProp) === "string") {
            var patternIndex = Card.patterns.indexOf(patternProp.toLowerCase());
            if (patternIndex !== -1) {
                patternName = Card.patterns[patternIndex]; // get it from the array so it's normalized
                pattern = {
                    index: patternIndex,
                    name: patternName
                }
            }
        } else if (typeof (patternProp === "number")) {
            patternName = Card.patterns[patternProp];
            if (typeof (patternName) !== "undefined") {
                pattern = {
                    index: patternProp,
                    name: patternName
                }
            }
        }

        return pattern;
    }

    render() {
        return (
            <div className={"Card " + this.state.key + " highlight-" + this.props.highlight} data-facedown={this.props.facedown} style={{ backgroundColor: this.state.color.value }}>
                <div className="cardface">
                    <div>
                        {this.state.color.index} {this.state.color.name}<br />
                        {this.state.size.index} {this.state.size.name}<br />
                        {this.state.container.index} {this.state.container.name}<br />
                        {this.state.pattern.index} {this.state.pattern.name}<br />
                    </div>
                </div>
                <div className="cardback">
                </div>
            </div >
        );
    }
}

export default Card;

import React, { Component } from "react";
import { Provider } from "react-redux";

import "./App.css";
import StatusArea from "./components/StatusArea";
import Table from "./components/Table";
import DevTools from "./DevTools";
import configureStore from "./store";
import { debugRemoveBunchOfCardsAndFollowUp } from "./actions/cardsActions";

class App extends Component {
  constructor(props) {
    super(props);

    this.store = configureStore();
    this.state = { debugMode: false };
  }

  onDoubleClick() {
    this.setState({ debugMode: !this.state.debugMode });
  }

  onClearButtonClick() {
    this.store.dispatch(debugRemoveBunchOfCardsAndFollowUp());
  }

  render() {
    const debugButton = this.state.debugMode ? (
      <button
        className="ui button negative"
        tabIndex="0"
        onClick={this.onClearButtonClick.bind(this)}
      >
        Clear table
      </button>
    ) : (
      ""
    );

    return (
      <Provider store={this.store}>
        <div className="App">
          <header
            className="App-header"
            onDoubleClick={this.onDoubleClick.bind(this)}
          >
            {debugButton}

            <StatusArea />
          </header>
          <DevTools />
          <Table />
        </div>
      </Provider>
    );
  }
}

export default App;

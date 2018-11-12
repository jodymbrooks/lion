import React, { Component } from 'react';
import { Provider } from 'react-redux';

import './App.css';
import StatusArea from './components/StatusArea';
import Table from './components/Table';
import configureStore from './store';

class App extends Component {
  constructor(props) {
    super(props);

    this.store = configureStore();
  }

  render() {
    return (
      <Provider store={this.store}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">BOLD - the card game</h1>
            <StatusArea />
          </header>
          <Table />
        </div>
      </Provider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import './App.css';
import StatusArea from './components/StatusArea';
import Table from './components/Table';
import DevTools from './DevTools';
import configureStore from './store';
import { testRemoveBunchOfCardsAndFollowUp  } from './actions/cardsActions';

class App extends Component {
  constructor(props) {
    super(props);

    this.store = configureStore();
  }

  onClearButtonClick() {
    this.store.dispatch(testRemoveBunchOfCardsAndFollowUp());
  }


/*
            <button className='ui button negative' tabIndex='0' onClick={this.onClearButtonClick.bind(this)}>
              Clear table
            </button>



*/

  render() {
    return (
      <Provider store={this.store}>
        <div className="App">
          <header className="App-header">



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

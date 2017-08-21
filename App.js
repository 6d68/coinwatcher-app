import React, { Component } from 'react';

import CoinWatcherApp from './app/app';

import { Provider } from 'react-redux'
import configureStore from './app/store'

const store = configureStore()

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <CoinWatcherApp />
      </Provider>
    )
  }
}

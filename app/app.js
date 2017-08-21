// react stuff
import React, { Component } from 'react';

// navigation
import { StackNavigator } from 'react-navigation';

// Screens
import WatchList from './screens/watchList/watchList'
import WatchListDetail from './screens/watchList/watchListDetail'
import CurrencyList from './screens/watchList/currencyList'

export default CoinWatcherApp = StackNavigator({
  Main: {
    screen: WatchList
  },
  WatchListDetail: {
    screen: WatchListDetail
  },
  CurrencyList: {
    screen: CurrencyList
  },
}, {
    headerMode: 'screen',
  });
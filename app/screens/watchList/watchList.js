import React, { Component } from 'react';

import { Text, TouchableHighlight, FlatList, View, TouchableOpacity, Platform } from 'react-native';
import ActionButton from 'react-native-action-button';
import Divider from '../../components/divider'
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeout from 'react-native-swipeout';

import { connect } from 'react-redux'
import { watchesActionCreators } from '../../reducers/watchlist'

const mapStateToProps = (state) => {
  return Object.assign({}, state, {
    items: state.watchlist.items,
    userCurrency: state.watchlist.currency,
    loading: false,
    error: state.watchlist.error
  })
}

class WatchList extends React.Component {
  static navigationOptions = props => {
    const { navigation } = props;
    return {
      headerStyle: { marginTop: Platform.OS == "ios" ? 20 : 24 },
      headerTitle: 'Coin Watcher',
      headerLeft: null,
      headerRight: null
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    const { items, loading, error, dispatch } = this.props


    if (this.props.error) {
      return (
        <View style={{
          flex: 1,
          backgroundColor: '#f3f3f3'
        }}
        >
          <Text>Error</Text>
        </View>
      )
    }

    return (
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
        <FlatList
          data={this.props.items}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => item.id}
          ItemSeparatorComponent={() => <Divider />}
          refreshing={this.props.loading}
          onRefresh={this.refreshWatchList}
        >
        </FlatList>

        <ActionButton degrees={0} buttonColor="rgba(231,76,60,1)" onPress={() => navigate('CurrencyList')}>
          <CommunityIcon name="alarm" size={20} />
        </ActionButton>
      </View>
    );
  }

  renderRow = ({ item }) => {
    const currency = item;
    const { navigate } = this.props.navigation;

    var buttonsLeft = [
      {
        component: 
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            }}>
              <CommunityIcon name="delete" size={20} />
          </View>,
        onPress: () => this.removeFromWatchList(currency.id)
      }
    ]


    return (
      <Swipeout
        left={buttonsLeft}
        autoClose={true}
      >
        <TouchableOpacity onPress={() => navigate('WatchListDetail', currency)}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                margin: 5
              }}>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>{currency.name}</Text>
              <Text numberOfLines={1}>{currency.price_currency} {Number(currency.price).toFixed(2)}</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                margin: 5
              }}>
              {this.renderPriceChangeValue(currency)}
            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
    )
  }

  renderPriceChangeValue = (currency) => {
    return <Text style={{ color: currency.percent_change_24h > 0 ? 'green' : 'red', fontSize: 15, fontWeight: 'bold' }}>{currency.percent_change_24h} %</Text>
  }

  refreshWatchList = () => {
    const { dispatch } = this.props
    dispatch(watchesActionCreators.refresh())
  }

  removeFromWatchList = (currency_id) => {
    const { dispatch } = this.props
    dispatch(watchesActionCreators.removeFromWatchList(currency_id))
  }

}

export default connect(mapStateToProps)(WatchList)
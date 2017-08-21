import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default class WatchListDetail extends Component {
  static navigationOptions = props => {
    const { navigation } = props;
    return {
      headerStyle: { marginTop: Platform.OS == "ios" ? 20 : 24 },
      headerTitle: 'Coin Watcher',
      headerRight: (
        <View>
          <TouchableHighlight onPress={() => navigation.navigate('Settings')}>
            <CommunityIcon name="settings" size={20} />
          </TouchableHighlight>
        </View>
      ),
    }
  };

  static navigationOptions = props => {
    const { navigation } = props;
    const { state, setParams } = navigation;
    return {
      headerStyle: { marginTop: Platform.OS == "ios" ? 20 : 24 },
      headerTitle: `${state.params.name}`,
    }
  };

  render() {
    const nav = this.props.navigation;
    const currency = this.props.navigation.state.params

    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <View style={styles.row}>
          <Text style={styles.label}>Price:</Text>
          <Text style={styles.content} numberOfLines={1}> {currency.price_currency} {Number(currency.price).toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Change (1h):</Text>
          <Text style={styles.content} numberOfLines={1}> {currency.percent_change_1h} %</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Change (24h):</Text>
          <Text style={styles.content} numberOfLines={1}> {currency.percent_change_24h} %</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Change (7h):</Text>
          <Text style={styles.content} numberOfLines={1}> {currency.percent_change_7d} %</Text>
        </View>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    margin: 5
  },
  label: {
    flex: 2 / 5,
    fontWeight: "bold",
    fontSize: 15
  },
  content: {
    flex: 3 / 5,
  }
});
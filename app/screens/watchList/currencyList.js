import React, { Component } from 'react';

import { View, TextInput, Text, FlatList, ScrollView, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import Divider from '../../components/divider'
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from 'react-redux'
import service from '../../api/data_service';
import { watchesActionCreators } from '../../reducers/watchlist'

class CurrencyList extends React.Component {
  static navigationOptions = props => {
    const { navigation, filter } = props;
    const { state } = navigation;

    return { 
      headerStyle: { marginTop: Platform.OS == "ios" ? 20 : 24 },
      headerTitle: (
        <View style={{
          flexDirection: 'row',
          height: 80,
        }}><TextInput
            style={{ flex: 4 / 5 }}
            value={filter}
            placeholder={'Search'}
            keyboardType='web-search'
            onChangeText={(text) => state.params.handleTextChange(text)}
            onSubmitEditing={() => state.params.handleFindCurrency()}
          />
          <TouchableOpacity
            style={{
              flex: 1 / 5,
              overflow: 'hidden',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => state.params.handleFindCurrency()}>
            <CommunityIcon name="magnify" size={20} />
          </TouchableOpacity>
        </View>),
        
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      currencies: [],
      error: null,
      typing: ''
    };
  }

  componentWillMount() {
    this.props.navigation.setParams({
      handleTextChange: this.textChange,
      handleFindCurrency: this.findCurrency
    }
    );
  }

  textChange = (text) => {
    this.setState((prevState, props) => ({
      loading: prevState.loading,
      currencies: prevState.currencies,
      error: prevState.error,
      typing: text
    }))
  }

  findCurrency = () => {
    if(this.state.typing.length < 3) return;

    this.setState({ loading: true });

    return service.findCurrency(this.state.typing)
      .then((res) => {
        this.setState({
          currencies: res,
          loading: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: true });
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { error, dispatch } = this.props

    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator animating={this.state.loading} color='#bc2b78' size="large" />
        </View>
      )
    }

    return (
      <View>
        <ScrollView>
          <FlatList
            data={this.state.currencies}
            renderItem={this._renderRow}
            keyExtractor={(item, index) => item.id}
            ItemSeparatorComponent={() => <Divider />}
          >
          </FlatList>
        </ScrollView>
      </View >
    );
  }

  _renderRow = ({ item }) => {
    var currency = item;
    const { navigate } = this.props.navigation;
    const { dispatch } = this.props;
    return (
      <TouchableOpacity onPress={() => {
        dispatch(watchesActionCreators.watch(currency))
        navigate('Main')
      }}
      >
        <View style={{margin: 5}}>
          <Text
            style={{
                fontSize: 15,
                fontWeight: 'bold',
              }}
              >{currency.name.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default connect()(CurrencyList)
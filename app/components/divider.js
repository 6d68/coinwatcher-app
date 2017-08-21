import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View } from 'react-native'

class Divider extends Component {

    render() {
        return (
            <View style={{ height: this.props.height, backgroundColor: this.props.backgroundColor }} />
        )
    }
}

Divider.propTypes = {
    backgroundColor: PropTypes.string,
    heigt: PropTypes.number,
};

Divider.defaultProps = {
    backgroundColor: 'grey',
    height: 0.5
};

export default Divider;
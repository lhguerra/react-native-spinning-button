import React, {Component} from 'react'
import * as t from 'prop-types'

import {Animated, TouchableOpacity} from 'react-native'

class SpinningButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rotateValue: new Animated.Value(0),
      active: true
    }
  }

  _onPressButton = () => {
    if (
      this.state.rotateValue._value === 0 ||
      this.state.rotateValue._value % 360 === 0
    ) {
      Animated.spring(this.state.rotateValue, {
        toValue: this.state.rotateValue._value + 360
      }).start(() => this.props.onPress())
    }
  }

  render() {
    return (
      <TouchableOpacity {...this.props} onPress={this._onPressButton}>
        <Animated.View
          style={{
            transform: [
              {
                rotate: this.state.rotateValue.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg']
                })
              }
            ]
          }}>
          {this.props.children}
        </Animated.View>
      </TouchableOpacity>
    )
  }
}

SpinningButton.propTypes = {
  onPress: t.func.isRequired,
  children: t.node.isRequired
}

export default SpinningButton

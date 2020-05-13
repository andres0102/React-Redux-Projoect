import React, { Component } from 'react';
import Slider from '../../helpers/no_ui_slider'

export default class NoUiSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slider: null
    }
  }

  componentDidMount() {
    this.setState({ slider: Slider.call() })
  }

  render() {
    return(
      <div id="slider-range">
        { this.state.slider }
      </div>
    )
  }
}

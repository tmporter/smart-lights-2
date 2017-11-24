import React, { Component } from 'react';
import SpecialButton from './SpecialButton';
import { SwatchesPicker } from 'react-color';

// used to override SwatchesPicker styles
import './SwatchesPicker.css';

class App extends Component {

  updateActiveColor = (color) => {
    fetch(`/api/colors/active`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(color)
    })
      .then(res => res.json())
      .then(json => console.log(json));
  }

  handleColorChange = (color, event) => {
    console.log(color.hex);
    // send hex to api
    this.updateActiveColor({
      isSpecial: false,
      hex: color.hex
    });
  }

  handleSpecialClick = (type) => {
    this.updateActiveColor({
      isSpecial: true,
      type: type
    });
  }

  render() {
    return (
      <div className="App">
        <h2>Smart Lights</h2>
        <SwatchesPicker
          width="100%"
          height="100%"
          onChangeComplete={this.handleColorChange}
        />

        <h3>Special Commands</h3>
        <SpecialButton
          type='rainbow'
          onClick={this.handleSpecialClick}>
          Rainbow
        </SpecialButton>
        <SpecialButton
          type='strobe'
          onClick={this.handleSpecialClick}>
          Strobe
        </SpecialButton>
      </div>
    );
  }
}

export default App;

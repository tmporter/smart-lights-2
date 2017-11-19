import React, { Component } from 'react';
import ColorTable from './ColorTable';
import SpecialButton from './SpecialButton';

class App extends Component {
  handleSpecialClick = (type) => {
    fetch(`/api/colors/active`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isSpecial: true,
        type: type
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
      });
  }

  render() {
    return (
      <div className="App">
        <h2>Smart Lights</h2>
        <ColorTable />

        <h3>Special Commands</h3>
        <SpecialButton
          type='rainbow'
          onClick={this.handleSpecialClick}>
          Rainbow
        </SpecialButton>
      </div>
    );
  }
}

export default App;

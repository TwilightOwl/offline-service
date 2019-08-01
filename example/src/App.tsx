import React from 'react';
import logo from './logo.svg';

import { receive } from './offline';

class App extends React.Component {

  state = {
    result: 0
  }

  request = async () => {
    const result = await receive('/method 1', {});
    this.setState({ result })
  }

  render() {
    return (
      <div className="App">
        <br/>
        {this.state.result}
        <br/><br/><br/>
        <button onClick={this.request}>Make request</button>
      </div>
    );
  }
}

export default App;

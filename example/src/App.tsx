import React from 'react';
import logo from './logo.svg';

import request, { RefreshCacheStrategy, RequestCacheStrategy, RequestTypes, CacheThenNetworkRequestStrategyResult } from './offline';

class App extends React.Component {

  state = {
    result: 0
  }

  successRequest = () => this.request(true)
  failureRequest = () => this.request(false)

  request = async (success: boolean) => {
    // const result = await receive('/method 1', {});
    try {
      const result = await request(`${success ? '+' : '-'}/method 1`, {
        //requestCacheStrategy: RequestCacheStrategy.NetworkOnly,
        //requestCacheStrategy: RequestCacheStrategy.CacheOnly,
        //requestCacheStrategy: RequestCacheStrategy.NetworkFallingBackToCache,
        //requestCacheStrategy: RequestCacheStrategy.CacheFallingBackToNetwork,
        requestCacheStrategy: RequestCacheStrategy.CacheThenNetwork,

        //refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways,
        refreshCacheStrategy: RefreshCacheStrategy.RefreshWhenExpired,
        //refreshCacheStrategy: RefreshCacheStrategy.NoStore,
        
        requestType: RequestTypes.DataReceiveRequest
      }) as CacheThenNetworkRequestStrategyResult;
      //debugger;
      this.setState({ result: result.cached!.body });
      const networkResult = await result.network;
      this.setState({ result: networkResult.body });
    } catch (error) {
      throw error
    }
  }

  render() {
    return (
      <div className="App">
        <br/>
        {this.state.result}
        <br/><br/><br/>
        <button onClick={this.successRequest}>Make success request</button>
        <button onClick={this.failureRequest}>Make failure request</button>
      </div>
    );
  }
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import { request, storage, getCacheKey } from './mocks';

import OfflineService, {
  RefreshCacheStrategy, 
  RequestCacheStrategy, 
  RequestTypes, 
  CacheThenNetworkRequestStrategyResult, 
  ResponseWithCacheInfo 
} from '../../src';

const service = new OfflineService({ request, storage, getCacheKey });

class App extends React.Component {

  state = {
    result: 0
  }

  successRequest = () => this.request(true)
  failureRequest = () => this.request(false)

  request = async (success: boolean) => {
    // const result = await receive('/method 1', {});
    try {

      // Test 1
      /*
      const result = await service.request(`${success ? '+' : '-'}/method 1`, {
        //requestCacheStrategy: RequestCacheStrategy.NetworkOnly,
        //requestCacheStrategy: RequestCacheStrategy.CacheOnly,
        requestCacheStrategy: RequestCacheStrategy.NetworkFallingBackToCache,
        //requestCacheStrategy: RequestCacheStrategy.CacheFallingBackToNetwork,

        //refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways,
        refreshCacheStrategy: RefreshCacheStrategy.RefreshWhenExpired,
        //refreshCacheStrategy: RefreshCacheStrategy.NoStore,

        //deleteCacheIfExpired: true,        
        requestType: RequestTypes.DataReceiveRequest
      }) as ResponseWithCacheInfo ;
      this.setState({ result: `${result.body} ${result.cached ? 'cached' : ''} ${result.expired ? 'expired' : ''} ` });
      */

      // Test 2
      const result = await service.request(`${success ? '+' : '-'}/method 1`, {
        requestCacheStrategy: RequestCacheStrategy.CacheThenNetwork,

        //refreshCacheStrategy: RefreshCacheStrategy.RefreshAlways,
        refreshCacheStrategy: RefreshCacheStrategy.RefreshWhenExpired,
        //refreshCacheStrategy: RefreshCacheStrategy.NoStore,

        //deleteCacheIfExpired: true,
        requestType: RequestTypes.DataReceiveRequest        
      }) as CacheThenNetworkRequestStrategyResult;
      result.cached && this.setState({ result: `${result.cached.body} ${result.cached.cached ? 'cached' : ''} ${result.cached.expired ? 'expired' : ''} ` });
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

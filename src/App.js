import React, { Component} from 'react';

import './App.css';
import 'antd/dist/antd.css';
import Router from './router'

import { Provider } from "react-redux";
import store from './blog/store/store';

class App extends Component {
  render(h) {
    return (
        <Provider store={store}>
            <Router />  
        </Provider>
    )
  }
}

export default App;

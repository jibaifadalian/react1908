import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './01-base/context';
import axios from 'axios'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 
'http://localhost:8000' : 'http://172.18.12.1:8000';

ReactDOM.render(<App/>, document.getElementById('root'));


import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import reportWebVitals from './reportWebVitals';



ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

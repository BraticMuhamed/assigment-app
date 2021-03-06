import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';
import Home from './components/Home';
import Details from './components/Details';
import store from './redux/store';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/:tab/:id">
            <Details />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </BrowserRouter>{' '}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

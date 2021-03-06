import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Login from 'Routes/auth/Login';
import Wrapper from 'Components/Wrapper';

import { Provider } from 'react-redux';
import store from './store';

import '../scss/app.scss';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login} exact />
          <Route path="/" component={Wrapper} />
        </Switch>
      </HashRouter>
    </Provider>
  );
}

render(<App />, document.getElementById('app'));

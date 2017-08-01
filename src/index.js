import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import store from './store';
import App from './components/App';
import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </Router>
    </Provider>
    , document.getElementById('root'));
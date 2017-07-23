import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Homepage from './Homepage';
import About from './About';
import SearchResultContainer from '../containers/SearchResultContainer';
import Header from './Header';

const App = () => (
    <div>
        <Header />
        <div className="container">
            <Switch>
                <Route path="/homepage" component={Homepage} />
                <Route path="/search" component={SearchResultContainer} />
                <Route path="/about" component={About} />
                <Redirect from="/" to="/homepage" />
            </Switch>
        </div>
    </div>
)

export default App;
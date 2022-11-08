import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } 'react-router-dom'

import Navbar from './components/Layout/Navbar';
import Index from './components/Layout/Index';
import Lyrics from './components/tracks/Lyrics';

import  { Provider }  from './context';

import './App.css';

class App extends Component {
render() {
  return (
    <Provider>
    <Router>
    <React.Fragment>
    <Navbar />
     <div className="container">
     <Switch>
        <Route exact path="/" companent={Index}/>
        <Route exact path="/lyrics/track/:id" companent={Lyrics}/>
    </Switch>
    </div>
   <React.Fragment>
  </Router>
  </Provider>
    );
  }
}

export default App;

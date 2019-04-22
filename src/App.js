import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from './components/Container';
import ClassDetails from './components/ClassDetails';

class App extends Component {
  render() {
    return (
    	<Router>
      	<div className="App">
      		<Switch>
              <Route exact path='/' component={Container}/>
              <Route exact path='/class/:id' component={ClassDetails}/>
            </Switch>
      	</div>
      </Router>
    );
  }
}

export default App;
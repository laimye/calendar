import React, { Component } from 'react';
import './App.css';
import Month from './components/month/month';
import TaskCreate from './components/tasks/taskCreateEdit';
import {Switch, Route} from 'react-router-dom';
import { Button } from 'reactstrap';


class App extends Component {
  constructor(props){
    super(props);
    if(localStorage.todoData[0]!='{'){
      localStorage.todoData = JSON.stringify({});
    }
  }
  render() {
    return (
      <div className="App">
        <Switch>

          <Route exact path="/edit/:year-:month-:day/:index" component={ (props) => <TaskCreate {...props} />} />
          <Route exact path="/create/:year/:month/:day" component={ (props) => <TaskCreate {...props} />} />
          <Route exact path="/:year?/:month?/:day?" component={ Month } />
        </Switch>
      </div>
    );
  }
}

export default App;
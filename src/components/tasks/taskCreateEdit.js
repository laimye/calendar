import React, { Component } from 'react';
import TaskItem from '../tasks/task';
import { Link } from 'react-router-dom';
import './task.css';
import { Button } from 'reactstrap';


class TaskCreate extends Component {
  constructor(props) {
    super(props);
      let newState = {};
      if(props.match.params.index !== undefined) {
        newState.index = parseInt(props.match.params.index);

        // get all the text data from local storage
        let { year, month, day, index } = this.props.match.params;
        let fullDateKey = `${year}-${month}-${day}`;
        let existingItem = JSON.parse(localStorage.todoData)[fullDateKey][index];
        newState.name = existingItem.name;
        newState.description = existingItem.description;
        newState.dueDate = existingItem.dueDate;
        this.state = newState;
      } else {
        this.state = {
          name: '',
          dueDate: '',
          description: ''
        }
      }
      this.updateInput = this.updateInput.bind(this);
      this.saveItem = this.saveItem.bind(this);
      this.deleteItem = this.deleteItem.bind(this);
      if(!localStorage.todoData) {
        localStorage.todoData = JSON.stringify({});
    }
  }

  updateInput(event) {
    const elementName = event.target.getAttribute('name'); // name of the input field
    const elementValue = event.target.value; // the value of the input field
    const newState = {};
    newState[elementName] = elementValue;
    this.setState(newState);
  }

  saveItem() {
    // ONLY RUN THIS IF THERE IS DATA TO MAKE AN ITEM
    // get all the items currently in storage to add this item
    let { year, month, day, index } = this.props.match.params;
    month = month.toString().length < 2 ? '0' + month : month;
    day = day.toString().length < 2 ? '0' + day : day;
    let fullDateKey = `${year}-${month}-${day}`;

    let allTodoItems = JSON.parse(localStorage.todoData);
    let key = (this.state.dueDate === fullDateKey) ? fullDateKey: this.state.dueDate;
    let todaysItems = allTodoItems[key] || [];
    
    const newItem = {
      name: this.state.name,
      description: this.state.description,
      dueDate: this.state.dueDate,
      itemIndex: this.state.index!==undefined ? this.state.index : todaysItems.length // if item already exists (has index), keep it, else - assign new
    }

  
    todaysItems[ newItem.itemIndex ] = newItem;
    allTodoItems[key] = todaysItems;
    console.log('key', key)
    console.log('allTodoItems', allTodoItems);
    // save edited todo data back to localStorage
    localStorage.todoData = JSON.stringify(allTodoItems);
    this.props.history.goBack();
  }
  
  deleteItem() {
    // get all the items currently in storage to remove this item    
    let { dueDate, index } = this.state;
    let allTodoItems = JSON.parse(localStorage.todoData);
    let deleteItem = allTodoItems[dueDate][index];
    //remove the item from array
    allTodoItems[dueDate].splice(index, 1);
    //repackage all items and save in local storage
    localStorage.todoData = JSON.stringify(allTodoItems);
    this.props.history.goBack();
  }

  render () {
    return (
      <div className="task-item">
        <div className="task-header">
          <button onClick={this.props.history.goBack}>Back</button>
          {this.props.match.params.index !== undefined ? <span className="title">Edit Event</span> : <span className="title">New Event</span>}
          <button onClick={this.saveItem}>Save</button>
        </div>
        <div className="event-container">
          <input type="text" name="name" defaultValue={this.state.name} onChange={this.updateInput} placeholder="Title" />
          <label htmlFor="createDate">Due Date</label>
          <input type="date" name="dueDate" defaultValue={this.state.dueDate} onChange={this.updateInput} id="createDate" />
          <textarea name="description" defaultValue={this.state.description} onChange={this.updateInput} placeholder="Description"></textarea>
          {this.props.match.params.index !== undefined ? <button className="delete-button" onClick={this.deleteItem}>Delete</button> : ''}
        </div>
      </div>
    )

  }
}
export default TaskCreate;

// defaultValue={this.state.name}
// value={`${year}-${month}-${day}`}

/* TO DO:
BUGS:
- when changing date in an existing event - it creates a copy istead of updating it; - because  we create a new object, where the key is the date

*/
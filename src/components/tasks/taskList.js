import React, { Component } from 'react';
import TaskItem from './task';
import { Link } from 'react-router-dom';

// show items for a due date
class TaskList extends Component {


  displayTasks(){
    const allItemsString = localStorage.todoData;
    const allItemsObject = JSON.parse(allItemsString);
    let { year, month, date } = this.props.date;
    month = month.toString().length < 2 ? '0' + month : month;
    date = date.toString().length < 2 ? '0' + date : date;
    let fullDateKey = `${year}-${month}-${date}`;
    let todaysItemsArray = allItemsObject[fullDateKey] || [];
    return todaysItemsArray.map( (item, index) => <TaskItem key={index} index={index} {...item} />)
  }
  
  render () {
    return (
      <div>{this.displayTasks()}</div>
    )
  }
}

export default TaskList;
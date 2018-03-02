import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class TaskItem extends Component {
  render () {
		let name = null;
		// console.log(this.props);
    name = (this.props.showAll ? this.props.name : <Link to={`/edit/${this.props.dueDate}/${this.props.itemIndex}`}>{this.props.name}</Link>);
    return (
      <div className="App">
        <li className="todoLabel">{name}</li>
        {/* <input type='date' value={this.props.dueDate} /> */}
        {this.props.showAll ? <div className="todoDescription">{this.props.description}</div> : ''}
      </div>
    )
  }
}

export default TaskItem;
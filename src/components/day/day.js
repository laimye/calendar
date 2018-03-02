import React, { Component } from 'react';
import './day.css';
import { Link } from 'react-router-dom';
import TaskList from '../tasks/taskList';


class Day extends Component {
	constructor(props) {
		super(props);
	
	}

	render() {
		if(this.props.fulldate){
			return (
				<div className="day-box">
					<Link className="day-of-month" to={`/create/${this.props.fulldate.year}/${this.props.fulldate.month}/${this.props.fulldate.date}`}>{this.props.fulldate.date}</Link>
					<TaskList date={this.props.fulldate} />
				</div>
			)
		} else {
			return (<div className="day-box" />);
		}
	}
}

export default Day;
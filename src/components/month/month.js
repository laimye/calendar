import React, { Component } from 'react';
import Day from '../day/day';
import './month.css';
import { Link } from 'react-router-dom';

class Month extends Component {
	constructor(props) {
		super(props);
		const time = new Date();
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		if(this.props.match.params.year) {
			this.state = {
				currentYear: parseInt(props.match.params.year, 10),
				currentMonth: parseInt(props.match.params.month, 10),
				currentDay: parseInt(props.match.params.day, 10),
			}
		} else {
			this.state = {
				currentYear: time.getFullYear(),
				currentMonth: time.getMonth() + 1,
				currentDay: time.getDate(),
			}
		}
	}

	changeMonth(dir) {
		let { currentMonth, currentYear, currentDay } = this.findDate();
		if (currentMonth === 1 && dir === -1) {
				currentMonth = 12;
				currentYear = currentYear + dir;
		} else if (currentMonth === 12 && dir === +1) {
				currentMonth = 1;
				currentYear = currentYear + dir;
		} else {
			currentMonth = currentMonth + dir;
		}
		return `/${currentYear}/${currentMonth}/1`;
	}

	findToday() {
		let currentYear, currentMonth, currentDay;
		let time = new Date();		
		currentYear = time.getFullYear();
		currentMonth = time.getMonth() + 1;
		currentDay = time.getDate();
		return `/${currentYear}/${currentMonth}/1`;
	}

	findDate() {
		let currentYear, currentMonth, currentDay;
		let time = new Date();
		if(this.props.match.params.year || this.props.match.params.month) {
			currentYear = parseInt(this.props.match.params.year, 10);
			currentMonth = parseInt(this.props.match.params.month, 10);
			currentDay = parseInt(this.props.match.params.day, 10);
		} else {
			currentYear = time.getFullYear();
			currentMonth = time.getMonth() + 1;
			currentDay = time.getDate();
		}
		return { currentYear, currentMonth, currentDay };
	}

	renderMonthLabel() {
		const { currentMonth, currentYear } = this.findDate();
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		return (
			<span className="month">{months[currentMonth-1]}, {currentYear}</span>
		)
	}

	drawTable() {
		const calendar = [];
		const { currentMonth, currentYear, currentDay = 1 } = this.findDate();
		let lastDay = (new Date(currentYear, currentMonth, 0)).getDay();
		let lastDayOfMonth = lastDay+1;
		let daysInMonth = (new Date(currentYear, currentMonth, 0)).getDate();
		let firstDay = (new Date(currentYear, currentMonth-1, 1)).getDay();

		for (let emptyDays = 0; emptyDays < firstDay; emptyDays++) {
			calendar.push(
				<Day />
			)
		}

		for (let day = 1, index = 0; day <= daysInMonth; day++, index++ ) {
			let i = day;
			calendar.push(
				<Day key = {index} fulldate={{year: currentYear, month: currentMonth, date: i}} />
			)
		}
		while(lastDayOfMonth%7 !== 0){
			calendar.push(<Day />);
			lastDayOfMonth++;
		}
		return calendar;
	}

	render(){
		return(
			<div className="calendar-container">
				<div className="top-header">
					<span>{this.renderMonthLabel()}</span>
					<span className="change-month">
						<button><Link to={this.changeMonth(-1)}>&#60;</Link></button>
						<button><Link to={this.findToday()}>TODAY</Link></button>
						<button><Link to={this.changeMonth(+1)}>&#62;</Link></button>
					</span>
				</div>
				{this.drawTable()}
			</div>
		);
	}
}

export default Month;
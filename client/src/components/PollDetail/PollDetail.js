import React from 'react';
import * as d3 from "d3";
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import './PollDetail.css';

export default class PollDetail extends React.Component {
	state = {
		data: {
				id: 1,
				author: 'Ammmmmmy White',
				topic: 'Your favorite breed of dog',
				options: [
					{optionId: 0, option: 'Retrievers', vote: 800},
					{optionId: 1, option: 'German Shepherd Dogs', vote: 520},
					{optionId: 2, option: 'Bulldogs', vote: 106},
					{optionId: 3, option: 'Rottweilers', vote: 80},
					{optionId: 4, option: 'Pointers', vote: 100},
					{optionId: 5, option: 'Corgis', vote: 600}
				],
				postTime: 'Tue Mar 02 2017 12:17:29 GMT-0700 (PDT)',
				voteNum: 2206,
				type: 'public'
			}
	}
	componentDidMount(){
		this.renderChart();
		window.addEventListener('resize', this.renderChart);
	}
	componentWillUnmount(){
		window.removeEventListener('resize', this.renderChart);
	}
	parseTime = (timeStr) => {
		let timeObj = new Date(timeStr);
		return `${timeObj.getUTCFullYear()}/${timeObj.getMonth() + 1}/${timeObj.getDate()}`;
	}
	renderChart = () => {
		let chart = d3.select('#chart');
		let data = this.state.data.options;
		let width = chart.node().clientWidth;
		let xScale = d3.scaleLinear()
			.domain([0, d3.max(data, d => d.vote)])
			.range([0, width]);
		chart.selectAll('.bar').remove();
		let bars = chart
			.selectAll('.bar')
			.data(data)
			.enter()
			.append('div')
			.attr('class', 'bar');
		bars.append('div').attr('class', 'label').text(d => d.option);
		bars.append('div').attr('class', 'vote').text(d => d.vote);
		bars
		    .style('top', (d, i) => i * 50 + 30 + 'px')
		    .style('height', '20px')
		    .style('width', '0px')
		    .transition()
		    .delay(500)
		    .duration(1000)
		    .style('width', d => xScale(d.vote) + 'px');
	}
	render(){
		let data = this.state.data;
		return (
			<div className="container poll-detail">
	        	<div className="poll-detail-info">
					<h1 className="text-title-2">
						{data.topic}
						<i className="fa fa-question"></i>
					</h1>
					<div className="poll-detail-info-desc">
						<p className="text-title-5">Created by {data.author} on {this.parseTime(data.postTime)}</p>
						<p className="text-title-5">Total vote: {data.voteNum}</p>
					</div>
					<Link to="/list">
						<RaisedButton className="poll-detail-info-btn" label="<< Back to list" />
					</Link>
					<RaisedButton className="poll-detail-info-btn" label="Share on Twitter" primary={true} 
						icon={<i className="fa fa-twitter" />} />
				</div>
				<div className="poll-detail-chart" id="chart" ref="chart"></div>
				<div className="background-poll1" style={{backgroundImage: "url(./images/poll1.jpg)"}}/>
			</div>
		)
	}
}

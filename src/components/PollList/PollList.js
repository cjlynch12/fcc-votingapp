import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import Badge from 'material-ui/Badge';
import "./PollList.css";
import PollVote from '../PollDetail/PollVote';

const VoteNum = (props) => (
	<Badge className="voteNum"
		badgeContent={props.voteNum} primary={true} 
		badgeStyle={{position: 'static', width: 40, borderRadius: 20}} />
)

class PollList extends React.Component {
	state = {
		list: [
			{
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
			},
			{
				id: 2,
				author: 'Coder Wong',
				topic: 'Your favorite front-end library',
				postTime: 'Tue Jun 13 2017 12:17:29 GMT-0700 (PDT)',
				voteNum: 120,
				type: 'public'
			},
			{
				id: 3,
				author: 'Coder Wong',
				topic: 'Your favorite project on GitHub',
				postTime: 'Tue Jan 2017 12:17:29 GMT-0700 (PDT)',
				voteNum: 80,
				type: 'public'
			},
			{
				id: 4,
				author: 'James Eater',
				topic: 'Best burger place in Palo Alto',
				postTime: 'Tue Jun 12 2017 12:17:29 GMT-0700 (PDT)',
				voteNum: 32,
				type: 'public'
			},
			{
				id: 5,
				author: 'James Eater',
				topic: 'Favorite places to visit in bay area',
				postTime: 'Tue Jun 12 2017 07:17:29 GMT-0700 (PDT)',
				voteNum: 3,
				type: 'public'
			},
			{
				id: 6,
				author: 'James Eater',
				topic: 'Best shopping place in Palo Alto',
				postTime: 'Tue Jun 11 2017 12:17:29 GMT-0700 (PDT)',
				voteNum: 1,
				type: 'public'
			},
			{
				id: 7,
				author: 'James Eater',
				topic: 'xxx',
				postTime: 'Tue Jun 01 2017 07:17:29 GMT-0700 (PDT)',
				voteNum: 1,
				type: 'public'
			},
			{
				id: 8,
				author: 'James Eater',
				topic: '.....',
				postTime: 'Tue Jun 05 2017 07:17:29 GMT-0700 (PDT)',
				voteNum: 1,
				type: 'public'
			},
			{
				id: 9,
				author: 'James Eater',
				topic: 'xxx',
				postTime: 'Tue Jun 01 2017 07:17:29 GMT-0700 (PDT)',
				voteNum: 1,
				type: 'public'
			},
			{
				id: 10,
				author: 'James Eater',
				topic: '.....',
				postTime: 'Tue Jun 05 2017 07:17:29 GMT-0700 (PDT)',
				voteNum: 1,
				type: 'public'
			}
		],
		searchInput: '',
		sortType: 'rank',
		pollVoteOpen: false,
		pollVoteData: []
	}
	handleInputChange = (e) => {
		this.setState({searchInput: e.target.value})
	}
	handleSortChange = (e, i, type) => {
		this.setState({sortType: type})
	}
	parseTime = (timeStr) => {
		let timeObj = new Date(timeStr);
		return `${timeObj.getUTCFullYear()}/${timeObj.getMonth() + 1}/${timeObj.getDate()}`;
	}
	openPollVote = (id) => {
		let pollVoteData = this.state.list.filter(listItem => listItem.id === id);
		this.setState({pollVoteOpen: true, pollVoteData: pollVoteData[0]});
	}
	closePollVote = () => {
		this.setState({pollVoteOpen: false});
	}
	render(){
		return (
			<div className="container poll-list-container">
				<div className="list-search">
					<h3 className="text-title-3">Search</h3>
					<TextField className="list-search-input"
				        hintText="enter keyword here..."
				        hintStyle={{color: '#000'}}
				        onChange={this.handleInputChange} 
				        value={this.state.searchInput}
				    />
			    </div>
			    <div className="list-rank">
			    <h3 className="text-title-3">Sort by</h3>
				    <SelectField className="list-rank-select"
			            value={this.state.sortType}
			            onChange={this.handleSortChange}
			        >
			          <MenuItem value="rank" primaryText="most popular" />
			          <MenuItem value="time" primaryText="most recent" />
			        </SelectField>
			    </div>
			    <List style={{width: "100%"}} className="poll-list">
			    	{
			    		this.state.list.map(item => (
			    			<ListItem className="poll-list-item"
						      	key={item.id}
						        leftIcon={<VoteNum voteNum={item.voteNum} />}
						        primaryText={item.topic}
						        secondaryText={
						        	<div className="list-item-secondary">
										<span className="author">by {item.author}</span>
										<span className="bar"> | </span>
										<span className="time">{this.parseTime(item.postTime)}</span>
									</div>
						        }
						        onTouchTap={this.openPollVote.bind(null, item.id)}
						    />
			    		))
			    	}
			    </List>
				<div className="background-poll1" 
					style={{backgroundImage: "url(./images/poll1.jpg)"}}/>
				<PollVote 
					pollVoteOpen={this.state.pollVoteOpen} 
					pollVoteData={this.state.pollVoteData} 
					closePollVote={this.closePollVote} />
			</div>
		)
	}
}

export default PollList;
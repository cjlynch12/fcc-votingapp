import React from 'react';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import Badge from 'material-ui/Badge';
import "./PollList.css";
import PollVote from '../PollDetail/PollVote';
import PollEdit from '../PollDetail/PollEdit';

const VoteNum = (props) => (
	<Badge className="voteNum"
		badgeContent={props.voteNum} primary={true} 
		badgeStyle={{position: 'static', width: 40, borderRadius: 20}} />
)

const DeleteBtn = (props) => (
	<div className="deleteBtn">
		<i className=" fa fa-trash"></i>
	</div>
)

const PollListItem = (props) => (
	<ListItem className="poll-list-item"
        leftIcon={props.deletable ? <DeleteBtn /> : <VoteNum voteNum={props.voteNum} />}
        primaryText={props.topic}
        secondaryText={
        	<div className="list-item-secondary">
				<span className="author">{props.deletable ? `vote: ${props.voteNum}` : `by ${props.author}`}</span>
				<span className="bar"> | </span>
				<span className="time">{props.postTimeDisplay}</span>
			</div>
        }
        onTouchTap={props.handleListClick}
    />
)

class PollList extends React.Component {
	state = {
		searchInput: '',
		sortType: 'rank',
		pollVoteOpen: false,
		pollVoteData: [],
		pollEditOpen: false
	}
	handleInputChange = (e) => this.setState({searchInput: e.target.value})
	handleSortChange = (e, i, type) => this.setState({sortType: type})
	renderPollListItem = (pollList, user) => {
		if(user._id){
			if(this.props.deletable){
				return pollList.map(poll => (
					<PollListItem key={poll._id} {...poll} deletable={true}
						postTimeDisplay={this.parseTime(poll.postTime)} 
						handleListClick={this.openPollEdit.bind(null, poll._id)} />
				))
			} else {
				return pollList.map(poll => (
					user.pollVoted.includes(poll._id) ?
					<Link to={'/poll' + poll._id} key={poll._id} >
						<PollListItem {...poll} postTimeDisplay={this.parseTime(poll.postTime)} />
					</Link> 
					:
					<PollListItem key={poll._id} {...poll} 
						postTimeDisplay={this.parseTime(poll.postTime)} 
						handleListClick={this.openPollVote.bind(null, poll._id)} />
				))
			}
		} else {
			return pollList.map(poll => (
				<PollListItem key={poll._id} {...poll} 
					postTimeDisplay={this.parseTime(poll.postTime)} 
					handleListClick={this.openPollVote.bind(null, poll._id)} />
			))
		}
	}
	sortPollList = (pollList) => {
		return pollList.sort((l1, l2) => {
			if(this.state.sortType === 'rank'){
				return l2.voteNum - l1.voteNum;
			} else {
				return new Date(l2.postTime) - new Date(l1.postTime);
			}
		})
	}
	searchPollList = (pollList) => {
		return pollList.filter(poll => {
			let searchString = this.state.searchInput.toLowerCase();
			let topic = poll.topic.toLowerCase();
			return topic.includes(searchString);
		});
	}
	parseTime = (timeStr) => {
		let timeObj = new Date(timeStr);
		return `${timeObj.getUTCFullYear()}/${timeObj.getMonth() + 1}/${timeObj.getDate()}`;
	}
	openPollVote = (id) => {
		let pollVoteData = this.props.pollList.find(listItem => listItem._id === id);
		this.setState({pollVoteOpen: true, pollVoteData: pollVoteData});
	}
	openPollEdit = (id) => {
		let pollData = this.props.pollList.find(listItem => listItem._id === id);
		this.setState({pollEditOpen: true, pollData: pollData});
	}
	closePollVote = () => {
		this.setState({pollVoteOpen: false});
	}
	render(){
		let {pollList, user} = this.props;
		if(this.state.searchInput !== ''){
			pollList = this.searchPollList(pollList);
		}
		pollList = this.sortPollList(pollList);
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
			    	{ this.renderPollListItem(pollList, user) }
			    </List>
				<div className="background-poll1" style={{backgroundImage: "url(./images/poll1.jpg)"}}/>
				<PollVote 
					user={this.props.user}
					pollVoteOpen={this.state.pollVoteOpen} 
					pollVoteData={this.state.pollVoteData} 
					closePollVote={this.closePollVote} 
					updateDataForNewVote={this.props.updateDataForNewVote}
				/>
				<PollVote 
					user={this.props.user}
					pollEditOpen={this.state.pollVoteOpen} 
					pollData={this.state.pollData} 
					closePollEdit={this.closePollEdit} 
				/>
			</div>
		)
	}
}

export default PollList;
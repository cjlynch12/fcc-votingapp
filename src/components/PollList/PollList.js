import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import Badge from 'material-ui/Badge';
import "./PollList.css";

const VoteNum = () => (
	<Badge className="voteNum"
		badgeContent={4} primary={true} 
		badgeStyle={{position: 'static'}} />
)

class PollList extends React.Component {
	state = {
		list: [

		],
		searchInput: '',
		sortType: 'rank'
	}
	handleInputChange = (e) => {
		this.setState({searchInput: e.target.value})
	}
	handleSortChange = (e) => {

	}
	render(){
		return (
			<div className="container">
				<div className="list-search">
					<h3 className="text-title-3">Search</h3>
					<TextField
						className="list-search-input"
				        hintText="enter keyword here..."
				        hintStyle={{color: '#000'}}
				        onChange={this.handleInputChange} 
				        value={this.state.searchInput}
				    />
			    </div>
			    <div className="list-rank">
			    <h3 className="text-title-3">Sort by</h3>
				    <SelectField
				    	className="list-rank-select"
			            value={this.state.sortType}
			            onChange={this.handleSortChange}
			        >
			          <MenuItem value="rank" primaryText="vote number" />
			          <MenuItem value="time" primaryText="time posted" />
			        </SelectField>
			    </div>
			    <List style={{width: "100%"}} className="poll-list">
			      <ListItem
			      	className="poll-list-item"
			        leftIcon={<VoteNum />}
			        primaryText="Recipes"
			        secondaryText={
			        	<div className="list-item-secondary">
							<span className="author">by Author </span>
							<span className="bar"> | </span>
							<span className="time"> Jan 17, 2014</span>
						</div>
			        }
			        innerDivStyle={{
			        	display: "flex", 
			        	justifyContent: "space-between", 
			        	alignItems: "center", 
			        	padding: "14px 28px"
			        }}
			      />
			    </List>
				<div className="background-poll1" style={{backgroundImage: "url(./images/poll1.jpg)"}}/>
			</div>
		)
	}
}

export default PollList;
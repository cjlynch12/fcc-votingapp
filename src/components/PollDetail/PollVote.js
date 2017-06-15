import React from 'react';
import { Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import './PollVote.css';

export default class PollVote extends React.Component {
	state = {
		pollVoteOpen: false,
		pollVoteData: {},
		optionSelected: null
	}
	componentWillReceiveProps = (nextProps) => {
		this.setState({
			pollVoteOpen: nextProps.pollVoteOpen,
			pollVoteData: nextProps.pollVoteData
		});
	}
	handleOpen = () => this.setState({pollVoteOpen: true});
	handleClose = () => {
		this.setState({pollVoteOpen: false});
		this.props.closePollVote();
	}
	handleSelect = (e, i, value) => this.setState({optionSelected: value});
	handleVote = () => {
		this.handleClose();
		console.log('POST');
		// post and redirect to /detial:pollId
	}
	render() {
		const actions = [
			 <RaisedButton label="<< Back to list" style={{float: 'left'}} onTouchTap={this.handleClose}/>,
			 <Link to={'/' + this.state.pollVoteData.id} >
			 	<RaisedButton label="Vote and see result >>" primary={true}  onTouchTap={this.handleVote}/>
	 		</Link>
	    ];
	    let pollVoteData = this.state.pollVoteData;
	    return (
	      <div>
	        <Dialog
	          title='Vote and view poll result'
	          actions={actions}
	          actionsContainerStyle={{padding: "0px 25px 40px 25px"}}
	          modal={false}
	          open={this.state.pollVoteOpen}
	          onRequestClose={this.handleClose}
	        >
	          <h3 className="text-title-3">Question</h3>
	          <p className="poll-question">{this.state.pollVoteData.topic}</p>
	          <div className="poll-vote-wrapper">
	          	  <p className="text-title-5">I'd like to vote for</p>
		          <SelectField
			          floatingLabelText="Choose an option..."
			          value={this.state.optionSelected}
			          onChange={this.handleSelect}
			      >
			      	{pollVoteData.options && pollVoteData.options.map(option => 
		      			<MenuItem key={option.optionId} value={option.option} primaryText={option.option} />
			      	)}
			      </SelectField>
	          </div>
	        </Dialog>
	      </div>
	    );
	}
}

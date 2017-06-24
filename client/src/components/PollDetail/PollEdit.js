import React from 'react';
import { Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {deletePoll} from '../../lib/client';
import {updateUserForPollRemove} from '../../lib/helper';
import './PollVote.css';

export default class PollEdit extends React.Component {
	state = {
		pollEditOpen: false
	}
	componentWillReceiveProps = (nextProps) => {
		this.setState({
			pollEditOpen: nextProps.pollEditOpen
		});
	}
	handleOpen = () => this.setState({pollEditOpen: true})
	handleClose = () => {
		this.setState({pollEditOpen: false});
		this.props.closePollEdit();
	}
	handlePollDelete = () => {
		let {_id, pollCreated} = this.props.user;
		let pollId = this.props.pollData._id;
		let data = {userId: _id, pollCreated};
		deletePoll(pollId, data, res => {
			let updatedUser = updateUserForPollRemove(pollId, this.props.user);
			this.props.updateDataForDeletePoll(pollId, updatedUser);
		});
		this.handleClose();
	}
	render() {
		let pollData = this.props.pollData;
		const actions = [
			<Link to={'/poll' + pollData._id} >
			 	<RaisedButton className="poll-vote-btn" label="View poll result" style={{float: 'left'}} onTouchTap={this.handleVote}/>
	 		</Link>,
	 		<RaisedButton className="poll-vote-btn" label="Delete poll" primary={true} onTouchTap={this.handlePollDelete}/>
	    ];
	    return (
	      <div>
	        <Dialog
	          title={'View poll result or delete poll'}
	          actions={actions}
	          actionsContainerStyle={{padding: "0px 25px 40px 25px"}}
	          modal={false}
	          open={this.state.pollEditOpen}
	          onRequestClose={this.handleClose}
	        >
	          <h3 className="text-title-3">Question</h3>
	          <p className="poll-question">{pollData.topic}</p>
	        </Dialog>
	      </div>
	    );
	}
}
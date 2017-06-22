import React from 'react';
import { Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {} from '../../lib/client';
import {} from '../../lib/helper';
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
	render() {
		let pollData = this.props.pollData;
		const actions = [
			<Link to={'/poll' + pollData._id} >
			 	<RaisedButton className="poll-vote-btn" label="View poll result" primary={true} style={{float: 'left'}} onTouchTap={this.handleVote}/>
	 		</Link>,
	 		<RaisedButton className="poll-vote-btn" label="Delete poll" onTouchTap={this.handleClose}/>
	    ];
	    return (
	      <div>
	        <Dialog
	          title={'Wiew poll result or delete poll'}
	          actions={actions}
	          actionsContainerStyle={{padding: "0px 25px 40px 25px"}}
	          modal={false}
	          open={this.state.pollEditOpen}
	          onRequestClose={this.handleClose}
	        >
	          <h3 className="text-title-3">Question</h3>
	          <p className="poll-question">{pollData.topic}</p>
	          <div className="poll-vote-wrapper">
	          	  <p className="text-title-5">I'd like to vote for</p>
	          </div>
	        </Dialog>
	      </div>
	    );
	}
}
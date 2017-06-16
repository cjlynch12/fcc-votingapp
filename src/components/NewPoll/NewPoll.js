import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RadioBtn from 'material-ui/svg-icons/toggle/radio-button-checked';
import Close from 'material-ui/svg-icons/content/clear';
import './NewPoll.css';

export default class NewPoll extends React.Component {
	state = {
		open: false,
		question: '',
		options: ['', '']
	}
	componentWillReceiveProps(nextProps){
		this.setState({open: nextProps.open});
	}
	handleClose = () => {
		this.setState({open: false})
		this.props.closeNewPoll();
	}
	handleOpen = () => {
		this.setState({open: true})
	}
	updateQuestion = (e) => {
		this.setState({question: e.target.value});
	}
	addOption = () => {
		let stateOptions = this.state.options;
		let options = [...stateOptions, ''];
		this.setState({options});
	}
	removeOption = (i) => {
		let stateOptions = this.state.options;
		let options = [...stateOptions.slice(0, i), ...stateOptions.slice(i+1)];
		this.setState({options});
	}
	updateOption = (i, e) => {
		console.log(e.target.value);
		let stateOptions = this.state.options;
		let options = [...stateOptions.slice(0, i), e.target.value, ...stateOptions.slice(i+1)];
		this.setState({options});
	}
	renderOptions = () => {
		let options = this.state.options;
		return options.map((option, i) => 
			<div className="newpoll-option-wrapper" key={i}>
		    	<RadioBtn style={{fill: '#FF9800'}} />
		    	<TextField className="newpoll-option-input" 
		    		hintText={option === '' ? 'Option'+(i+1) : option} 
		    		value={this.state.options[i]} onChange={this.updateOption.bind(null, i)} />
			    <Close style={{fill: '#BDBDBD'}} onTouchTap={this.removeOption.bind(null, i)} />
		    </div>)
	}
	render(){
		const actions = [
	      <FlatButton
	        label="CLOSE"
	        onTouchTap={this.handleClose}
	        style={{color: '#9E9E9E'}}
	      />,
	      <FlatButton
	        label="SAVE"
	        primary={true}
	        keyboardFocused={true}
	        onTouchTap={this.handleClose}
	      />,
	    ];
	    return (
	      <div>
	        <Dialog className="newpoll-dialog"
	          title="New Poll"
	          actions={actions}
	          modal={false}
	          open={this.state.open}
	          onRequestClose={this.handleClose}
	          autoScrollBodyContent={true}
	        >
	        	<TextField className="newpoll-question"
			        hintText="Question"
			        floatingLabelText="Question"
			        value={this.state.question}
			        onChange={this.updateQuestion}
			    />
			    {this.renderOptions()}
			    <FlatButton
			        label="Add more Option"
			        primary={true}
			        style={{float: 'right'}}
			        onTouchTap={this.addOption}
			    />
	        </Dialog>
	      </div>
	    );
	}
}
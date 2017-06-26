import React from 'react';
import Dialog from 'material-ui/Dialog';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './Signin.css'

const dialogStyle = {
	contentStyle: {maxWidth: 520}
}
const tabStyle = {
	tabItemContainerStyle: {background: '#F0F0F0'},
	buttonStyle: {color: 'rgba(0, 0, 0, 0.6)'}
};
const btnStyle = {
	margin: "15px auto 5px auto",
	width: 100
};

class Signin extends React.Component {
	state = {
		open: false,
		fields: {
			username: '',
			password: ''
		}
	}
	componentWillReceiveProps(nextProps){
		this.setState({open: nextProps.open})
	} 
	handleOpen = () => {
		this.setState({open: true})
	}
	handleClose = () => {
		this.setState({open: false})
		this.props.closeSignin();
	}
	render(){
		return (
	        <Dialog
	          modal={false}
	          open={this.state.open}
	          onRequestClose={this.handleClose}
	          className="signin-dialog-wrapper"
	          contentStyle={dialogStyle.contentStyle}
	        >
	          <p>Sign in with your social network account</p>
	          <div className="signin-social-icons">
	          	<i className="fa fa-facebook-square"></i>
	          	<i className="fa fa-google-plus-square"></i>
	          	<i className="fa fa-twitter-square"></i>
	          	<i className="fa fa-github-square"></i>
	          </div>
	          <p>Or use your email</p>
	          <SigninTab userSignup={this.props.userSignup} userLogin={this.props.userLogin} />
	        </Dialog>
	    );
	}
}

class SigninTab extends React.Component{
	state = {
		fields: {
			username: this.props.fields.username,
			password: this.props.fields.password
		},
		errorText: {
			username: '',
			password: ''
		}
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			fields: {
				username: nextProps.fields.username,
				password: nextProps.fields.password
			}
		});
	}
	handleInputChange = e => {
		let fields = this.state.fields;
		let errorText = this.state.errorText;
		let {name, value} = e.target;
		fields[name] = value;
		errorText[name] = '';
		this.setState({fields, errorText});
	}
	handleSubmit = () => {
		let {username, password} = this.state.fields;
		if(username === '' || password === ''){
			let errorText = {}
			if(username === ''){
				errorText.username = 'Username is required';
			} else {
				errorText.password = 'Password is required';
			}
			this.setState({errorText});
			return;
		}
		

	}	
	renderTab = type => {
		let label = type === 'signup' ? 'Sign up' : 'Log in';
		return (
			<Tab label="Sign up" buttonStyle={tabStyle.buttonStyle}>
			  <div className="signin-tab-content">
			    <TextField
			    	name="username"
			    	value={this.state.fields.username}
			    	onChange={this.handleInputChange}
			    	errorText={this.state.errorText.username}
			        hintText="Username"
			        fullWidth={true}
			    />
			    <TextField
			    	name="password"
			    	value={this.state.fields.password}
			    	onChange={this.handleInputChange}
			    	errorText={this.state.errorText.password}
			        hintText="Password"
			        fullWidth={true}
			    />
			    <RaisedButton label="Sign up" primary={true} style={btnStyle} onTouchTap={() => this.handleSubmit(type)} />
			  </div>
			</Tab>
		)
	}
	render(){
		return (
			<Tabs tabItemContainerStyle={tabStyle.tabItemContainerStyle}>
				{this.renderTab('signup')}
			    {this.renderTab('login')}
			</Tabs>
		)
	}
}	

export default Signin;
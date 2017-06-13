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
		open: false
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
	          <SigninTab />
	        </Dialog>
	    );
	}
}

const SigninTab = (props) => (
	<Tabs tabItemContainerStyle={tabStyle.tabItemContainerStyle}>
		<Tab label="Sign up" buttonStyle={tabStyle.buttonStyle}>
	      <div className="signin-tab-content">
	        <TextField
		      hintText="Email"
		      fullWidth={true}
		    />
	        <TextField
		      hintText="Password"
		      fullWidth={true}
		    />
		    <RaisedButton label="Sign up" primary={true} style={btnStyle} />
	      </div>
	    </Tab>
	    <Tab label="Log in" buttonStyle={tabStyle.buttonStyle}>
	      <div className="signin-tab-content">
	        <TextField
		      hintText="Email"
		      fullWidth={true}
		    />
	        <TextField
		      hintText="Password"
		      fullWidth={true}
		    />
		    <RaisedButton label="Log in" primary={true} style={btnStyle} />
	      </div>
	    </Tab>
	</Tabs>
)	

export default Signin;
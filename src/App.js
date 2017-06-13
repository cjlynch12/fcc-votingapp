// modules
import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom'
// style
import './style/App.css';
// components
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Signin from './components/Signin/Signin';
import PollList from './components/PollList/PollList';

const About = () => <h1>About</h1>

class App extends React.Component {
	state = {
		signinOpen: false,
		newPollOpen: false,
	}
	openSignin = () => {
		this.setState({signinOpen: true})
	}
	closeSignin = () => {
		this.setState({signinOpen: false})
	}
	render() {
		return (
		    <Router>
		    	<div>
		    		<Header openSignin={this.openSignin} />
		    		<Route exact path="/" 
		    			render={()=><Home openSignin={this.openSignin} />}
	    			/>
		    		<Route path="/about" component={About} />
		    		<Route path="/list" component={PollList} />
		    		<Signin open={this.state.signinOpen} closeSignin={this.closeSignin} />
		    	</div>
		    </Router>
		);
	}
}

export default App;

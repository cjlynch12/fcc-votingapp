// modules
import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom'
// style
import './style/App.css';
// components
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import About from './components/About/About';
import PollList from './components/PollList/PollList';
import Signin from './components/Signin/Signin';
import NewPoll from './components/NewPoll/NewPoll';

class App extends React.Component {
	state = {
		signinOpen: false,
		newPollOpen: false,
	}
	setDivide = (divideState) => {
		this.setState({divide: divideState});
	}
	openSignin = () => {
		this.setState({signinOpen: true});
	}
	closeSignin = () => {
		this.setState({signinOpen: false});
	}
	render() {
		console.log(this.state.divide);
		return (
		    <Router>
		    	<div className={this.state.divide ? "app-root divide" : "app-root"}>
		    		<Header openSignin={this.openSignin} setDivide={this.setDivide} />
		    		<Route exact path="/" 
		    			render={()=><Home openSignin={this.openSignin} />}
	    			/>
		    		<Route path="/about" component={About} />
		    		<Route path="/list" component={PollList} />
		    		<Signin open={this.state.signinOpen} closeSignin={this.closeSignin} />
		    		<NewPoll />
		    	</div>
		    </Router>
		);
	}
}

export default App;

// modules
import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom'
// style
import './style/App.css';
// components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import About from './components/About/About';
import PollList from './components/PollList/PollList';
import PollDetail from './components/PollDetail/PollDetail';
import Signin from './components/Signin/Signin';
import NewPoll from './components/NewPoll/NewPoll';
// server communication
import {getPollList} from './lib/client';

class App extends React.Component {
	state = {
		signinOpen: false,
		newPollOpen: false,
		pollList: [],
		user: {
	        "_id": "5949972b97b56d3ebe4074fc",
	        "username": "Ammmmmmy White",
	        "pollVoted": [
	            "594991c73f5ad13ea0cdfc64"
	        ],
	        "pollCreated": [
	            "59495c90d90e973d802f0aac",
	            "59499a4b68e5263eca2daa00"
	        ]
	    }
	}
	componentDidMount(){
		this.loadPollList();
	}
	loadPollList = () => getPollList(pollList => this.setState({pollList}))
	openSignin = () => this.setState({signinOpen: true})
	closeSignin = () => this.setState({signinOpen: false})
	openNewPoll = () => this.setState({newPollOpen: true})
	closeNewPoll = () => this.setState({newPollOpen: false})
	render() {
		return (
		    <Router>
		    	<div className={this.state.divide ? "app-root divide" : "app-root"}>
		    		<Header openSignin={this.openSignin} openNewPoll={this.openNewPoll} />

		    		<Route exact path="/" render={() => <Home openSignin={this.openSignin} />} />
		    		<Route path="/about" component={About} />
		    		<Route path="/list" render={() => <PollList pollList={this.state.pollList} user={this.state.user} />} />
		    		<Route path="/poll:pollId" render={() => <PollDetail pollList={this.state.pollList} user={this.state.user} />} />

		    		<Signin open={this.state.signinOpen} closeSignin={this.closeSignin} />
		    		<NewPoll open={this.state.newPollOpen} closeNewPoll={this.closeNewPoll} />
		    		<Footer />
		    	</div>
		    </Router>
		);
	}
}

export default App;

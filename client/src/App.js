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
import {getPollList, userLogin} from './lib/client';
import {updatePollList, addNewPoll, removePollById} from './lib/helper';

class App extends React.Component {
	state = {
		signinOpen: false,
		newPollOpen: false,
		pollList: [],
		user: {}
	}
	componentDidMount(){
		this.loadPollList();
		// loadUser needs to change to signin and logout
		this.loadUser();
	}
	loadPollList = () => getPollList(pollList => this.setState({pollList}))
	loadUser = () => userLogin("Ammmmmmy White", user => this.setState({user}))
	updateDataForNewVote = (updatedPoll, updatedUser) => {
		let updatedPollList = updatePollList(updatedPoll, this.state.pollList);
		this.setState({pollList: updatedPollList, user: updatedUser});
	} 
	updateDataForNewPoll = (newPoll, updatedUser) => {
		let updatedPollList = addNewPoll(newPoll, this.state.pollList);
		this.setState({pollList: updatedPollList, user: updatedUser});
	}
	updateDataForDeletePoll = (pollId, updatedUser) => {
		let updatedPollList = removePollById(pollId, this.state.pollList);
		this.setState({pollList: updatedPollList, user: updatedUser});
	}
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
		    		<Route path="/list" render={() => (
		    			<PollList 
		    				pollList={this.state.pollList} 
		    				user={this.state.user} 
		    				updateDataForNewVote={this.updateDataForNewVote}
		    			/>
		    		)} />
		    		<Route path="/mypoll" render={() => {
		    			let username = this.state.user.username;
		    			if(!username) return null;
		    			let pollList = this.state.pollList.filter(poll => poll.author === username);
		    			return <PollList 
		    				pollList={pollList} 
		    				user={this.state.user} 
		    				deletable={true}
		    				updateDataForDeletePoll={this.updateDataForDeletePoll}
		    			/>
		    		}} />
		    		<Route path="/poll:pollId" render={({match}) => {
		    			let pollId = match.params.pollId;
		    			let pollData = this.state.pollList.find(poll => poll._id === pollId);
		    			return <PollDetail pollData={pollData} user={this.state.user} />
		    		}} />

		    		<Signin open={this.state.signinOpen} closeSignin={this.closeSignin} />
		    		<NewPoll 
		    			pollList={this.state.pollList} user={this.state.user} 
		    			updateDataForNewPoll={this.updateDataForNewPoll}
		    			open={this.state.newPollOpen} closeNewPoll={this.closeNewPoll} />
		    		<Footer />
		    	</div>
		    </Router>
		);
	}
}

export default App;

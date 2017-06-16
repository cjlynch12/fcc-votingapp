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

class App extends React.Component {
	state = {
		signinOpen: false,
		newPollOpen: false,
	}
	openSignin = () => this.setState({signinOpen: true});
	closeSignin = () => this.setState({signinOpen: false});
	openNewPoll = () => this.setState({newPollOpen: true});
	closeNewPoll = () => this.setState({newPollOpen: false});
	render() {
		return (
		    <Router>
		    	<div className={this.state.divide ? "app-root divide" : "app-root"}>
		    		<Header openSignin={this.openSignin} openNewPoll={this.openNewPoll} />
		    		<Route exact path="/" 
		    			render={()=><Home openSignin={this.openSignin} />}
	    			/>
		    		<Route path="/about" component={About} />
		    		<Route path="/list" component={PollList} />
		    		<Route path="/poll:pollId" component={PollDetail} />
		    		<Signin open={this.state.signinOpen} closeSignin={this.closeSignin} />
		    		<NewPoll open={this.state.newPollOpen} closeNewPoll={this.closeNewPoll} />
		    		<Footer />
		    	</div>
		    </Router>
		);
	}
}

export default App;

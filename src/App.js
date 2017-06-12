// modules
import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom'
// style
import './style/App.css';
// components
import Header from './components/Header/Header'
import Home from './components/Home/Home'

const About = () => <h1>About</h1>

class App extends React.Component {
  render() {
    return (
        <Router>
        	<div>
        		<Header />
        		<Route exact path="/" component={Home} />
        		<Route path="/about" component={About} />
        	</div>
        </Router>
    );
  }
}

export default App;

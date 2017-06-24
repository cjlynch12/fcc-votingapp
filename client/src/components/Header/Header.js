import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import Divider from 'material-ui/Divider';

const drawerContainerStyle = {
	textAlign: "center", 
	paddingTop: "80px",
	backgroundColor: "#FCFCFC",
	backgroundImage: "url(./images/poll2.jpg)",
	backgroundPosition: "0% 100%",
    backgroundRepeat: "no-repeat"
}

class Header extends React.Component{
	state = {
		open: false,
		login: !!this.props.user._id
	}
	componentWillReceiveProps(nextProps){
		this.setState({login: !!nextProps.user._id})
	}
	handleSidebarToggle = () => this.setState({open: !this.state.open})
	handleSidebarClose = () => this.setState({open: false})
	handleLogout = () => this.setState({login: false}) // also need to destory token...
	render(){
		return (
		  <header className="header">
		  	<Link className="header-logo" to="/">
		  		<img className="header-logo-img" src="./images/logo.png" alt="2poll logo" />
		  		<h1 className="header-logo-title">2POLL</h1>
		  	</Link>
		  	<nav className="header-nav">
		  		<Link className="header-nav-about" to="/about">About</Link>
				<Link className="header-nav-polllist" to="/list">Poll list</Link>
				{
					this.state.login ?
						<IconMenu
					        iconButtonElement={<a className="header-nav-user">Welcome, {this.props.user.username}</a>}
					        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
					        targetOrigin={{horizontal: 'right', vertical: 'top'}}
					    >
				            <MenuItem>
				            	<Link className="header-nav-newpoll" to="#" onTouchTap={this.props.openNewPoll}>
				            		Create New
				            	</Link>
				            </MenuItem>
				            <MenuItem>
				            	<Link className="header-nav-mypolls" to="/mypoll">
				            		View My Polls
				            	</Link>
				            </MenuItem>
				            <Divider />
				            <MenuItem>
				            	<Link className="header-nav-logout" to="#" onTouchTap={this.handleLogout}>
				            		Logout
				            	</Link>
				            </MenuItem>
				        </IconMenu>
						:
						<Link className="header-nav-signin" to="#" onTouchTap={this.props.openSignin}>Sign in</Link>
				}
		  	</nav>
		  	<div className="header-nav-sm">
		  		<IconButton>
		  			<MenuIcon onTouchTap={this.handleSidebarToggle} />
		  		</IconButton>
		        <Drawer 
		        	className="header-nav-side"
		        	width={200} docked={false} openSecondary={true}
		        	open={this.state.open} 
		        	onRequestChange={(open) => this.setState({open})}
		        	containerStyle={drawerContainerStyle}
				>
		            <MenuItem onTouchTap={this.handleSidebarClose}> 
		          	    <Link to="/about">About</Link>
	          	    </MenuItem>
		            <MenuItem onTouchTap={this.handleSidebarClose}>
		          	    <Link to="/list">Poll list</Link>
	          	    </MenuItem>
	          	    {
	          	    	this.state.login ?
		          	    	<div>
			          	    	<MenuItem onTouchTap={this.handleSidebarClose}>
					          	    <Link to="#" onTouchTap={this.props.openNewPoll}>Create New</Link>
				          	    </MenuItem> 
				          	    <MenuItem onTouchTap={this.handleSidebarClose}>
					          	    <Link to="/mypoll" >My Polls</Link>
				          	    </MenuItem> 
				          	    <MenuItem onTouchTap={this.handleSidebarClose}>
					          	    <Link to="#" onTouchTap={this.handleLogout}>Logout</Link>
				          	    </MenuItem>
			          	    </div> :
		          	    	<MenuItem onTouchTap={this.handleSidebarClose}>
					        	<Link to="#" onTouchTap={this.props.openSignin}>Sign in</Link>
					    	</MenuItem>
	          	    }
		        </Drawer>
		      </div>
		  </header>
		)
	}
};

export default Header;
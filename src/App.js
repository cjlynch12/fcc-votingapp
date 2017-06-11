import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import pollTheme from './style/theme.js';
import './style/App.css';
import Header from './components/Header/Header'

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={pollTheme}>
        <Header />
      </MuiThemeProvider>
    );
  }
}

export default App;

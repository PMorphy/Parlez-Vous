import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import User from './pages/User';
import NavBar from './components/NavBar';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
import axios from 'axios';

import jwtDecode from 'jwt-decode';

import './App.css';
import AuthRoute from './components/util/AuthRoute';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#a5d6a7',
      main: '#43a047',
      dark: '#2e7d32',
      contrastText: '#fff'
    },
    secondary: {
      light: '#aed581',
      main: '#d53737',
      dark: '#558b2',
      contrastText: '#fff'
    }
  },
  pagesTheme: {
    form: {
      textAlign: 'center'
    },
    pageIcon: {
      maxWidth: 70,
      margin: '20px auto 20px auto'
    },
    pageTitle: {
      margin: '20px auto 20px auto'
    },
    textField: {
      margin: '10px auto 10px auto'
    },
    button: {
      margin: '20px auto',
      position: 'relative'
    },
    customError: {
      fontSize: '0.8rem',
      color: 'red',
      marginTop: '10px'
    },
    progress: {
      position: 'absolute'
    },
    invisibleSeparator: {
      margin: 4,
      border: 'none'
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
    }
  }
});

// axios.defaults.baseURL =
//   'https://us-central1-parlezvous-12211.cloudfunctions.net/api';

const token = localStorage.FBToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div className='App'>
            <Router>
              <NavBar />
              <div className='container'>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <AuthRoute exact path='/signup' component={Signup} />
                  <AuthRoute exact path='/login' component={Login} />
                  <Route exact path='/users/:handle' component={User} />
                  <Route
                    exact
                    path='/users/:handle/parler/:parlerId'
                    component={User}
                  />
                </Switch>
              </div>
            </Router>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;

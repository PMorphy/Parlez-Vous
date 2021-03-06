import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MyButton from '../components/util/MyButton';
import PostParler from './PostParler';
import Notifications from '../components/Notifications';

class NavBar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar className='nav-container'>
          {authenticated ? (
            <Fragment>
              <PostParler />
              <Link to='/'>
                <MyButton tip='Home'>
                  <HomeIcon color='secondary' />
                </MyButton>
              </Link>
              <Notifications color='secondary' />
            </Fragment>
          ) : (
            <Fragment>
              <Button color='inherit' component={Link} to='/login'>
                Login
              </Button>
              <Button color='inherit' component={Link} to='/'>
                Home
              </Button>
              <Button color='inherit' component={Link} to='/signup'>
                Signup
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

NavBar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(NavBar);

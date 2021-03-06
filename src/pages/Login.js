import React, { Component } from 'react';
import PropsTypes from 'prop-types';
import Icon from '../components/images/icon.png';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = (theme) => ({
  ...theme.pagesTheme
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = { email: this.state.email, password: this.state.password };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  static getDerivedStateFromProps(props) {
    if (props.UI.errors) {
      return {
        errors: props.UI.errors
      };
    }
    return null;
  }

  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>
          <img className={classes.pageIcon} src={Icon} alt='French Flag' />
          <Typography className={classes.pageTitle} variant='h2'>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              className={classes.textField}
              fullWidth
              id='email'
              name='email'
              type='email'
              label='Email'
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
            />
            <TextField
              className={classes.textField}
              fullWidth
              id='password'
              name='password'
              type='password'
              label='Password'
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
            />
            {errors.general && (
              <Typography className={classes.customError} variant='body2'>
                {errors.general}
              </Typography>
            )}
            <Button
              className={classes.button}
              type='submit'
              variant='contained'
              color='primary'
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress className={classes.progress} size={30} />
              )}
            </Button>
            <br />
            <small>
              Don't Have an Account? Signup{' '}
              <Link className='signupButton' to='/signup'>
                Here
              </Link>
            </small>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropsTypes.object.isRequired,
  loginUser: PropsTypes.func.isRequired,
  user: PropsTypes.object.isRequired,
  UI: PropsTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login));

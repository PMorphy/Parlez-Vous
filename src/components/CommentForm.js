import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { submitComment } from '../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.pagesTheme
});

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      errors: {}
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.UI.errors) {
      return {
        errors: props.UI.errors
      };
    } else {
      return { errors: {} };
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitComment(this.props.parlerId, { body: this.state.body });
    this.setState({ body: '' });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, authenticated } = this.props;
    const { errors } = this.state;
    const commentFormMarkup = authenticated ? (
      <Grid item sm={12} style={{ textAlign: 'center' }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name='body'
            type='text'
            label='Give a Comment'
            error={errors.comment ? true : false}
            helperText={errors.comment}
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
          />

          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
          >
            Comment
          </Button>
        </form>
        <hr className={classes.visibleSeparator} />
      </Grid>
    ) : null;
    return commentFormMarkup;
  }
}

CommentForm.propTypes = {
  parlerId: PropTypes.string.isRequired,
  UI: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  submitComment: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

const mapActionToProps = {
  submitComment
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(CommentForm));

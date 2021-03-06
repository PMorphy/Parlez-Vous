import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import MyButton from '../components/util/MyButton';

// Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import { postParler, clearErrors } from '../redux/actions/dataActions';

const styles = (theme) => ({
  submitButton: {
    position: 'relative',
    margin: '20px 0px 20px 0px',
    float: 'right'
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '5%'
  }
});

class PostParler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      body: '',
      errors: {},
      submitted: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true, errors: {} });
    this.props.clearErrors();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postParler({ body: this.state.body });
    this.setState({ submitted: true });
  };

  static getDerivedStateFromProps(props, state) {
    if (props.UI.errors) {
      return {
        errors: props.UI.errors
      };
    }
    if (state.submitted && state.body.trim() !== '') {
      return { body: '', open: false, submitted: false };
    }

    return null;
  }

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip='Parlez Vous'>
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <MyButton
            tip='Close'
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post Something!</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name='body'
                type='text'
                label='Parlez Vous!'
                multiline
                rows='3'
                placeholder='Parlez with Your Friends'
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostParler.propTypes = {
  UI: PropTypes.object.isRequired,
  postParler: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  UI: state.UI
});

const mapActionsToProps = {
  postParler,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PostParler));

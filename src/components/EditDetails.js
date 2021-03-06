import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MyButton from '../components/util/MyButton';

// Icons
import EditIcon from '@material-ui/icons/Edit';

import { editUserDetails } from '../redux/actions/userActions';

const styles = (theme) => ({
  ...theme.pagesTheme,
  button: { float: 'right' }
});

class EditDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: '',
      website: '',
      location: '',
      open: false
    };
  }

  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }

  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };

  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : ''
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <MyButton
          tip='Edit Details'
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          <EditIcon color='primary' />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <DialogTitle>Edit Your Details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name='bio'
                type='text'
                label='Bio'
                multiline
                row='3'
                placeholder='Tell Us About Yourself'
                className={classes.TextField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <TextField
                name='website'
                type='text'
                label='Website'
                placeholder='Your Personal/Professional Website'
                className={classes.TextField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <TextField
                name='location'
                type='text'
                label='Location'
                placeholder='Where You Live'
                className={classes.TextField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
            </form>
          </DialogContent>
          <DialogActions>
            <Button color='secondary' onClick={this.handleClose}>
              Cancel
            </Button>
            <Button color='primary' onClick={this.handleSubmit}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  credentials: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials
});

const mapActionToProps = {
  editUserDetails
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(EditDetails));

import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';

import MyButton from './util/MyButton';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { deleteParler } from '../redux/actions/dataActions';

const styles = (theme) => ({
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
});

class DeleteParler extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDeleteParler = () => {
    this.props.deleteParler(this.props.parlerId);
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip='Delete Parler'
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color='secondary' />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <DialogTitle>
            Are You Sure You Want to Delete This Parler?
          </DialogTitle>
          <DialogActions>
            <Button color='primary' onClick={this.handleClose}>
              Cancel
            </Button>
            <Button color='secondary' onClick={this.handleDeleteParler}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteParler.propTypes = {
  deleteParler: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  parlerId: PropTypes.string.isRequired
};

const mapActionsToProps = {
  deleteParler
};

export default connect(
  null,
  mapActionsToProps
)(withStyles(styles)(DeleteParler));

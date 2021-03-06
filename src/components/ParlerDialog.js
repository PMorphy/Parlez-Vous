import React, { Component, Fragment } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

import MyButton from './util/MyButton';
import LikeButton from './LikeButton';

import Comments from './Comments';
import CommentForm from './CommentForm';

import { getParler, clearErrors } from '../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.pagesTheme,
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover',
    marginTop: 15
  },
  dialogContent: {
    padding: 30,
    overflowX: 'hidden'
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: 5
  },
  expandButton: {
    position: 'absolute',
    left: '90%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: '50px',
    marginBottom: '50px'
  }
});

class ParlerDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      oldPath: '',
      newPath: ''
    };
  }

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }

  handleOpen = () => {
    let oldPath = window.location.pathname;
    const { userHandle, parlerId } = this.props;
    const newPath = `/users/${userHandle}/parler/${parlerId}`;
    window.history.pushState(null, null, newPath);

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    this.props.getParler(this.props.parlerId);
    this.setState({ open: true, oldPath, newPath });
  };

  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
    const {
      classes,
      parler: {
        createdAt,
        userHandle,
        body,
        likeCount,
        userImage,
        parlerId,
        commentCount,
        comments
      },
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={10}>
        <Grid item sm={5} xs={12}>
          <img src={userImage} alt='Profile' className={classes.profileImage} />
        </Grid>
        <Grid item sm={7} xs={12}>
          <Typography
            component={Link}
            color='primary'
            variant='h5'
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant='body2' color='textSecondary'>
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant='body1'>{body}</Typography>
          <LikeButton parlerId={parlerId} />
          <span>{likeCount} likes</span>
          <MyButton tip='comments'>
            <ChatIcon color='primary' />
          </MyButton>
          <span>{commentCount} comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm parlerId={parlerId} />
        <Comments comments={comments} />
      </Grid>
    );
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip='Expand Parler'
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color='primary' />
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
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ParlerDialog.propTypes = {
  getParler: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  parlerId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  parler: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  parler: state.data.parler,
  UI: state.UI
});

const mapActionsToProps = { getParler, clearErrors };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ParlerDialog));

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import NoImg from './images/noImg.png';
// MUI
import Paper from '@material-ui/core/Paper';

const styles = (theme) => ({
  ...theme.pagesTheme,
  paper: {
    display: 'flex',
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  handle: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: '0 auto 7px auto'
  },
  cover: {
    width: 200,
    objectFit: 'cover',
    borderRadius: '50%',
    marginTop: 20
  },
  fullLine: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '100%',
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '50%',
    marginBottom: 10
  }
});

const ProfileSkeleton = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className='image-wrapper'>
          <img src={NoImg} alt='profile' className={classes.cover} />
        </div>
        <hr />
        <div className='profile-details'>
          <div className={classes.handle} />
          <hr />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <hr />
          <div className={classes.fullLine} />
          <hr />
          <div className={classes.fullLine} />
          <hr />
        </div>
      </div>
    </Paper>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);

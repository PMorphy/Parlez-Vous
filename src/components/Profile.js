import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import EditDetails from '../components/EditDetails';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import MuiLink from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

import MyButton from '../components/util/MyButton';
import ProfileSkeleton from './ProfileSkeleton';

import dayjs from 'dayjs';

import { logoutUser, uploadImage } from '../redux/actions/userActions';

const styles = (theme) => ({
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: '#00bcd4'
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
});

class Profile extends Component {
  handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append('image', imageFile, imageFile.name);
    this.props.uploadImage(formData);
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      classes,
      user: {
        credentials: { handle, imageUrl, bio, website, location, createdAt },
        loading,
        authenticated
      }
    } = this.props;
    const profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className='image-wrapper'>
              <img src={imageUrl} alt='profile' className='profile-image' />
              <input
                type='file'
                id='imageInput'
                hidden='hidden'
                onChange={this.handleImageChange}
              />
              <MyButton
                tip='Edit Profile Image'
                onClick={this.handleEditPicture}
                btnClassName='button'
              >
                <EditIcon color='primary' />
              </MyButton>
            </div>
            <hr />
            <div className='profile-details'>
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color='primary'
                variant='h5'
              >
                @{handle}
              </MuiLink>
              <hr />
              {bio && <Typography variant='body2'>{bio}</Typography>}
              <hr />
              {location && (
                <Fragment>
                  <LocationOn color='primary' /> <span>{location}</span>
                  <hr />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <LinkIcon color='primary' />
                  <a href={website} target='_blank' rel='noopener noreferrer'>
                    {' '}
                    {website}
                  </a>
                  <hr />
                </Fragment>
              )}
              <CalendarToday color='primary' />{' '}
              <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
            </div>
            <MyButton tip='Logout' onClick={this.handleLogout}>
              <KeyboardReturn color='primary' />
            </MyButton>
            <EditDetails />
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant='body2' align='center'>
            No profile found, please login again
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant='contained'
              color='primary'
              component={Link}
              to='/login'
            >
              Login
            </Button>
            <Button
              variant='contained'
              color='secondary'
              component={Link}
              to='/signup'
            >
              Signup
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <ProfileSkeleton />
    );
    return profileMarkup;
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
};

const mapActionsToProps = {
  logoutUser,
  uploadImage
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));

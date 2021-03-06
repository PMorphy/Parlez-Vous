import React, { Component } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import ChatIcon from '@material-ui/icons/Chat';

import withStyles from '@material-ui/core/styles/withStyles';

import { connect } from 'react-redux';

import MyButton from './util/MyButton';
import DeleteParler from '../components/DeleteParler';
import ParlerDialog from '../components/ParlerDialog';
import LikeButton from './LikeButton';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200,
    objectFit: 'cover'
  },
  content: {
    padding: 25
  }
};

class Parler extends Component {
  render() {
    dayjs.extend(relativeTime);

    const {
      classes,
      parler: {
        body,
        createdAt,
        userImage,
        userHandle,
        parlerId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteParler parlerId={parlerId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={userImage}
          title='Profile Image'
        />
        <CardContent className={classes.content}>
          <Typography
            variant='h5'
            component={Link}
            to={`/users/${userHandle}`}
            color='primary'
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant='body2' color='textSecondary'>
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant='body1'>{body}</Typography>
          <LikeButton parlerId={parlerId} />
          <span>{likeCount} Likes</span>
          <MyButton tip='Comments'>
            <ChatIcon color='primary' />
          </MyButton>
          <span>{commentCount} Comments</span>
          <ParlerDialog
            parlerId={parlerId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Parler.propTypes = {
  user: PropTypes.object.isRequired,
  parler: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Parler));

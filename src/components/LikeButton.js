import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MyButton from './util/MyButton';
import { Link } from 'react-router-dom';

import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { likeParler, unlikeParler } from '../redux/actions/dataActions';

class LikeButton extends Component {
  likedParler = () => {
    const { likes } = this.props.user;
    const { parlerId } = this.props;
    if (likes && likes.find((like) => like.parlerId === parlerId)) return true;
    return false;
  };

  likeParler = () => {
    this.props.likeParler(this.props.parlerId);
  };

  unlikeParler = () => {
    this.props.unlikeParler(this.props.parlerId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to='/login'>
        <MyButton tip='Like'>
          <FavoriteBorder color='primary' />
        </MyButton>
      </Link>
    ) : this.likedParler() ? (
      <MyButton tip='Undo Like' onClick={this.unlikeParler}>
        <FavoriteIcon color='secondary' />
      </MyButton>
    ) : (
      <MyButton tip='Like' onClick={this.likeParler}>
        <FavoriteBorder color='secondary' />
      </MyButton>
    );

    return likeButton;
  }
}

LikeButton.propTypes = {
  likeParler: PropTypes.func.isRequired,
  unlikeParler: PropTypes.func.isRequired,
  parlerId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  likeParler,
  unlikeParler
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);

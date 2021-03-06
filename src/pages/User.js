import React, { Component } from 'react';
import axios from 'axios';
import PropsTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';

import Parler from '../components/Parler';
import StaticProfile from '../components/StaticProfile';
import ParlerSkeleton from '../components/ParlerSkeleton';
import ProfileSkeleton from '../components/ProfileSkeleton';
import { getUserData } from '../redux/actions/dataActions';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      parlerIdParam: null
    };
  }

  componentDidMount() {
    const handle = this.props.match.params.handle;
    const parlerId = this.props.match.params.parlerId;
    if (parlerId) this.setState({ parlerIdParam: parlerId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({ profile: res.data.user });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    const { parles, loading } = this.props.data;
    const { parlerIdParam } = this.state;

    const parlesMarkup = loading ? (
      <ParlerSkeleton />
    ) : parles === null ? (
      <p>No Parles From this User</p>
    ) : !parlerIdParam ? (
      parles.map((parler) => <Parler key={parler.parlerId} parler={parler} />)
    ) : (
      parles.map((parler) => {
        if (parler.parlerId !== parlerIdParam) {
          return <Parler key={parler.parlerId} parler={parler} />;
        } else
          return <Parler key={parler.parlerId} parler={parler} openDialog />;
      })
    );
    return (
      <Grid container spacing={4}>
        <Grid item sm={8} xs={12}>
          {parlesMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

User.propTypes = {
  getUserData: PropsTypes.func.isRequired,
  data: PropsTypes.object.isRequired
};

const matStateToProps = (state) => ({
  data: state.data
});

const mapActionsToProps = {
  getUserData
};

export default connect(matStateToProps, mapActionsToProps)(User);

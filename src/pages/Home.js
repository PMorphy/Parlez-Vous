import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Parler from '../components/Parler';
import Profile from '../components/Profile';
import ParlerSkeleton from '../components/ParlerSkeleton';

import { getParles } from '../redux/actions/dataActions';

class Home extends Component {
  componentDidMount() {
    this.props.getParles();
  }
  render() {
    const { parles, loading } = this.props.data;
    let recentParlesMarkup = !loading ? (
      parles &&
      parles.map((parler) => <Parler key={parler.parlerId} parler={parler} />)
    ) : (
      <ParlerSkeleton />
    );
    return (
      <Grid container spacing={4}>
        <Grid item sm={8} xs={12}>
          {recentParlesMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  getParles: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapActionsToProps = {
  getParles
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps, mapActionsToProps)(Home);

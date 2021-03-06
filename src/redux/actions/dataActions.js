import {
  SET_PARLES,
  POST_PARLER,
  SET_PARLER,
  LOADING_PARLES,
  LIKE_PARLER,
  UNLIKE_PARLER,
  DELETE_PARLER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from '../types';

import axios from 'axios';

export const getParles = () => (dispatch) => {
  dispatch({ type: LOADING_PARLES });
  axios
    .get('/parles')
    .then((res) => {
      dispatch({ type: SET_PARLES, payload: res.data });
    })
    .catch((error) => {
      dispatch({ type: SET_PARLES, payload: [] });
      console.error(error);
    });
};

export const postParler = (newParler) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/parlez', newParler)
    .then((res) => {
      dispatch({ type: POST_PARLER, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((error) => {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
      console.error(error.response.data);
    });
};

export const getParler = (parlerId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/parler/${parlerId}`)
    .then((res) => {
      dispatch({ type: SET_PARLER, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((error) => {
      console.error(error);
    });
};

export const likeParler = (parlerId) => (dispatch) => {
  axios
    .get(`/parler/${parlerId}/like`)
    .then((res) => {
      dispatch({ type: LIKE_PARLER, payload: res.data });
    })
    .catch((error) => {
      console.error(error);
    });
};

export const unlikeParler = (parlerId) => (dispatch) => {
  axios
    .get(`/parler/${parlerId}/unlike`)
    .then((res) => {
      dispatch({ type: UNLIKE_PARLER, payload: res.data });
    })
    .catch((error) => {
      console.error(error);
    });
};

export const submitComment = (parlerId, commentData) => (dispatch) => {
  axios
    .post(`/parler/${parlerId}/comment`, commentData)
    .then((res) => {
      dispatch({ type: SUBMIT_COMMENT, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((error) => {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    });
};

export const deleteParler = (parlerId) => (dispatch) => {
  axios
    .delete(`/parler/${parlerId}/delete`)
    .then(() => {
      dispatch({ type: DELETE_PARLER, payload: parlerId });
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({ type: SET_PARLES, payload: res.data.parles });
    })
    .catch(() => {
      dispatch({ type: SET_PARLES, payload: null });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

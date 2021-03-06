import {
  SET_PARLES,
  POST_PARLER,
  SET_PARLER,
  LOADING_PARLES,
  LIKE_PARLER,
  UNLIKE_PARLER,
  DELETE_PARLER,
  SUBMIT_COMMENT
} from '../types';

const initialState = {
  parles: [],
  parler: {},
  loading: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOADING_PARLES:
      return { ...state, loading: true };
    case SET_PARLES:
      return { ...state, parles: payload, loading: false };
    case POST_PARLER:
      return { ...state, parles: [payload, ...state.parles] };
    case SET_PARLER:
      return { ...state, parler: payload, loading: false };
    case LIKE_PARLER:
    case UNLIKE_PARLER:
      let index = state.parles.findIndex(
        (parler) => parler.parlerId === payload.parlerId
      );
      state.parles[index] = payload;
      return { ...state };
    case DELETE_PARLER:
      index = state.parles.findIndex((parler) => parler.parlerId === payload);
      state.parles.splice(index, 1);
      return { ...state };
    case SUBMIT_COMMENT:
      return {
        ...state,
        parler: {
          ...state.parler,
          comments: [payload, ...state.parler.comments]
        }
      };

    default:
      return state;
  }
}

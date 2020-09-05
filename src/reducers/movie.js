import {
  GET_SHARE_MOVIES,
  GET_SHARE_MOVIES_ERROR,
  CREATE_SHARE,
  CREATE_SHARE_ERROR,
  CREATE_NOMINATION,
  CREATE_NOMINATION_ERROR,
  GET_MOVIES,
  GET_MOVIES_ERROR,
  FIND_OR_CREATE_MOVIE_ERROR,
  GET_API_MOVIES_ERROR,
  GET_API_MOVIES,
  REMOVE_NOMINATION,
  LOAD_NOMS_FROM_STORAGE,
  REMOVE_NOMINATION_ERROR,
} from '../actions/types';

const initialState = {
  shareMovies: [],
  loading: true,
  error: {},
  nominationMovies: [],
  shares: [],
  movies: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_SHARE_MOVIES:
      return { ...state, shareMovies: payload, loading: false };
    case CREATE_SHARE:
      return { ...state, shares: [...state.shares, payload], loading: false };
    case CREATE_NOMINATION:
      return {
        ...state,
        nominationMovies: [...state.nominationMovies, payload.movie],
        loading: false,
      };
    case LOAD_NOMS_FROM_STORAGE:
      return { ...state, nominationMovies: payload };
    case REMOVE_NOMINATION:
      return {
        ...state,
        nominationMovies: state.nominationMovies.filter(
          (mov) => mov.id !== payload
        ),
      };

    case GET_MOVIES:
      return { ...state, movies: payload, loading: false };
    case GET_API_MOVIES:
      return { ...state, apiMovies: payload, loading: false };
    case CREATE_SHARE_ERROR:
    case GET_SHARE_MOVIES_ERROR:
    case CREATE_NOMINATION_ERROR:
    case REMOVE_NOMINATION_ERROR:
    case FIND_OR_CREATE_MOVIE_ERROR:
    case GET_API_MOVIES_ERROR:
    case GET_MOVIES_ERROR:
      return { ...state, error: payload };
    default:
      return state;
  }
};

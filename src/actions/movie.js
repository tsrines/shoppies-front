import axios from 'axios';
import { API_URL } from '../config';
import {
  GET_SHARE_MOVIES,
  GET_SHARE_MOVIES_ERROR,
  CREATE_SHARE,
  CREATE_SHARE_ERROR,
  CREATE_NOMINATION,
  CREATE_NOMINATION_ERROR,
  FIND_OR_CREATE_MOVIE,
  FIND_OR_CREATE_MOVIE_ERROR,
} from './types';

export const getShareMovies = (id) => async (dispatch) => {
  let res;
  try {
    res = await axios.get(`${API_URL}/shares/${id}`);

    dispatch({
      type: GET_SHARE_MOVIES,
      payload: res.data,
    });
  } catch (err) {
    console.log('OUTPUT: getShare -> err', err.request);
    dispatch({
      type: GET_SHARE_MOVIES_ERROR,
      payload: { msg: err.response.statusText },
    });
  }
};

export const createShare = (nominationMovies) => async (dispatch) => {
  const movieArray = [];

  nominationMovies.forEach((mov) => {
    movieArray.push(mov.id);
  });
  const body = { csv: movieArray.join(',') };
  try {
    let res = await axios.post(`${API_URL}/shares`, body);
    dispatch({
      type: CREATE_SHARE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_SHARE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    console.log('OUTPUT: handleShare -> err', err);
  }
};

export const createNomination = (id) => async (dispatch) => {
  // TODO: Hardcorded user
  const body = {
    movie_id: id,
    user_id: 1,
  };

  try {
    let res = await axios.post(`${API_URL}/nominations`, body);
    dispatch({
      type: CREATE_NOMINATION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_NOMINATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    console.log('OUTPUT: createNomination -> err', err);
  }
};

export const addNomination = (imdbID) => (dispatch) => {};

export const findOrCreateMovie = ({
  Title: title,
  Year: year,
  Poster: poster,
  imdbID,
}) => async (dispatch) => {
  const body = { title, year, poster, imdbID };
  try {
    const res = await axios.post(`${API_URL}/movies`, body);
    dispatch({ type: FIND_OR_CREATE_MOVIE, payload: res.data });
  } catch (err) {
    dispatch({
      type: FIND_OR_CREATE_MOVIE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    console.log('OUTPUT: findOrCreateMovie -> err', err);
  }
};

export const deleteNomination = (id) => async (dispatch) => {
  let nomination;
  try {
    let res = await axios.delete(`${API_URL}/nominations/${id}`);
    nomination = res.data;
  } catch (err) {
    console.log('OUTPUT: deleteNomination -> err', err);
  }
  return nomination;
};

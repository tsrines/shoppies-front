import axios from 'axios';
import { API_URL } from '../config';
import {
  GET_SHARE_MOVIES,
  GET_SHARE_MOVIES_ERROR,
  CREATE_SHARE,
  CREATE_SHARE_ERROR,
  CREATE_NOMINATION,
  CREATE_NOMINATION_ERROR,
  REMOVE_NOMINATION,
  REMOVE_NOMINATION_ERROR,
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
  let res;
  nominationMovies.forEach((mov) => {
    movieArray.push(mov.id);
  });
  const body = { csv: movieArray.join(',') };
  try {
    res = await axios.post(`${API_URL}/shares`, body);
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
  return res.data;
};

export const addNomination = (id) => async (dispatch) => {
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

    localStorage.setItem(`${res.data.id}`, JSON.stringify(res.data.movie));
  } catch (err) {
    dispatch({
      type: CREATE_NOMINATION_ERROR,
      payload: { msg: err },
    });
    console.log('OUTPUT: createNomination -> err', err);
  }
};

export const removeNomination = (_, id) => async (dispatch) => {
  try {
    let res = await axios.delete(`${API_URL}/nominations/${id}`);
    dispatch({ type: REMOVE_NOMINATION, payload: res.data.movie.id });
    localStorage.removeItem(id);
  } catch (err) {
    dispatch({
      type: REMOVE_NOMINATION_ERROR,
      payload: { msg: err.response.statusText },
    });
    console.log('OUTPUT: deleteNomination -> err', err);
  }
};

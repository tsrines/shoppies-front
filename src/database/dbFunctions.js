import axios from 'axios';
import { API_URL } from '../config';

export const createNomination = async ({ id }) => {
  // TODO: Hardcorded user
  const body = {
    movie_id: id,
    user_id: 1,
  };
  let nomination;
  try {
    let res = await axios.post(`${API_URL}/nominations`, body);
    nomination = res.data;
  } catch (err) {
    console.log('OUTPUT: createNomination -> err', err);
  }
  return nomination;
};
export const findOrCreateMovie = async ({
  Title: title,
  Year: year,
  Poster: poster,
  imdbID,
}) => {
  const body = { title, year, poster, imdbID };
  let movie;
  try {
    let res = await axios.post(`${API_URL}/movies`, body);
    movie = res.data;
  } catch (err) {
    console.log('OUTPUT: findOrCreateMovie -> err', err);
  }
  return movie;
};

export const deleteNomination = async (id) => {
  let nomination;
  try {
    let res = await axios.delete(`${API_URL}/nominations/${id}`);
    nomination = res.data;
  } catch (err) {
    console.log('OUTPUT: deleteNomination -> err', err);
  }
  return nomination;
};

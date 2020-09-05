import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, color, timeout = 3000) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, color, id },
  });

  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id
    });
  }, timeout);
};

import axios from 'axios';
import { API_URL } from '../constants';

export const FETCH_USER_DATA = (authToken) => async (dispatch) => {
  const result = await axios.get(`${API_URL}/user`, {
    headers: {
      Authorization: authToken,
    },
  });

  console.log(result);

  dispatch({
    type: 'UPDATE_USER',
    user: userData,
  });
};

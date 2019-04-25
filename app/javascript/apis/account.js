import axios from 'axios';
import { API_URL } from '../constants';

export const login = async (emailAddress, password) => {
  try {
    const result = await axios.post(`${API_URL}/login`, {
      email: emailAddress,
      password: password,
    });
    return result;
  } catch (error) {
    throw new Error('Failed to login');
  }
};

export const signup = async (emailAddress, password) => {
  try {
    const result = await axios.post(`${API_URL}/user`, {
      email: emailAddress,
      password,
    });
    return result;
  } catch (error) {
    throw new Error('Failed to sign up');
  }
};

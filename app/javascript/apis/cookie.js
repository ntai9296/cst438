import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const COOKIES = {
  AUTHORIZATION: 'Authorization',
};

export const setCookie = (name, value) => {
  cookies.set(name, value);
};

export const removeCookie = (name) => {
  cookies.remove(name);
};

export const getCookie = (name) => cookies.get(name);

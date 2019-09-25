import axios from 'axios';

export default () => {
  let currentUser = JSON.parse(window.localStorage.currentUser);
  return axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: currentUser && currentUser.token
    }
  });
}
/* eslint-disable import/prefer-default-export */
// import { userConstants } from '../_constants';
// import { userService } from '../_services';
// import { alertActions } from '.';
// import { history } from '../_helpers';
import * as ActionTypes from './ActionTypes';
import * as API from '../data/api_links';

export const userLoading = () => ({
  type: ActionTypes.USER_LOADING,
});

export const userFailed = errmess => ({
  type: ActionTypes.USER_FAILED,
  payload: errmess,
});

export const usersLoading = () => ({
  type: ActionTypes.USERS_LOADING,
});

export const usersFailed = errmess => ({
  type: ActionTypes.USERS_FAILED,
  payload: errmess,
});

export const addUser = user => ({
  type: ActionTypes.ADD_USER,
  payload: user,
});

export const addAllUsers = users => ({
  type: ActionTypes.ADD_ALL_USERS,
  payload: users,
});

// export const changePassword = () => ({
//   type: ActionTypes.USER_PASSWORD_CHANGE,
// });

export const changePasswordFailed = errMess => ({
  type: ActionTypes.USER_PASSWORD_CHANGE_FAILED,
  payload: errMess,
});

export const requestLogin = creds => ({
  type: ActionTypes.LOGIN_REQUEST,
  creds,
});

export const receiveLogin = response => ({
  type: ActionTypes.LOGIN_SUCCESS,
  token: response.token,
});

export const loginError = message => ({
  type: ActionTypes.LOGIN_FAILURE,
  message,
});

export const requestLogout = () => ({
  type: ActionTypes.LOGOUT_REQUEST,
});

export const receiveLogout = () => ({
  type: ActionTypes.LOGOUT_SUCCESS,
});

export const requestRegister = () => ({
  type: ActionTypes.REGISTER_REQUEST,
});

export const receiveRegister = () => ({
  type: ActionTypes.REGISTER_SUCCESS,
});

export const registerError = message => ({
  type: ActionTypes.REGISTER_FAILED,
  payload: message,
});

export const fetchUser = () => (dispatch) => {
  dispatch(userLoading(true));

  const bearer = `Bearer ${localStorage.getItem('token')}`;

  return fetch(API.userAPI, {
    method: 'GET',
    // body: JSON.stringify(newComment),
    headers: {
      'Content-Type': 'application/json',
      // Origin: 'localhost:3001/',
      Authorization: bearer,
    },
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      const error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      console.log(error);
      throw error;
    },
    (error) => {
      const errmess = new Error(error.message);
      throw errmess;
    })
    .then(response => response.json())
    .then((user) => {
      const acUser = {
        ...user,
        join_year: new Date(user.join_year),
        grad_year: new Date(user.grad_year),
        birth_date: new Date(user.birth_date),
      };
      dispatch(addUser(acUser));
    })
    .catch(error => dispatch(userFailed(error.message)));
};

export const fetchAllUsers = () => (dispatch) => {
  dispatch(usersLoading(true));

  // const bearer = `Bearer ${localStorage.getItem('token')}`;

  return fetch(`${API.userAPI}`, {
    method: 'GET',
    // body: JSON.stringify(newComment),
    headers: {
      'Content-Type': 'application/json',
      // Origin: 'localhost:3001/',
      // Authorization: bearer,
    },
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      const error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      console.log(error);
      throw error;
    },
    (error) => {
      const errmess = new Error(error.message);
      throw errmess;
    })
    .then(response => response.json())
    .then((users) => {
      const gotUsers = users.data;
      const allUsers = gotUsers.map(cUser => ({
        ...cUser,
        join_year: cUser.join_year === null ? new Date() : new Date(cUser.join_year),
        grad_year: cUser.grad_year === null ? new Date() : new Date(cUser.grad_year),
        birth_date: cUser.birth_date === null ? new Date() : new Date(cUser.birth_date),
      }));
      dispatch(addAllUsers(allUsers));
    })
    .catch(error => dispatch(usersFailed(error.message)));
};

export const loginUser = creds => (dispatch) => {
  // We dispatch requestLogin to kickoff the call to the API
  dispatch(requestLogin(creds));

  return fetch(API.loginAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds),
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      const error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    },
    (error) => {
      throw error;
    })
    .then(response => response.json())
    .then((response) => {
      if (response.success) {
        // If login was successful, set the token in local storage
        localStorage.setItem('token', response.token);
        localStorage.setItem('creds', JSON.stringify(creds));
        // Dispatch the success action
        dispatch(receiveLogin(response));
        dispatch(fetchUser());
      } else {
        const error = new Error(`Error ${response.status}`);
        error.response = response;
        throw error;
      }
    })
    .catch(error => dispatch(loginError(error.message)));
};

export const registerUser = registerCreds => (dispatch) => {
  dispatch(requestRegister);
  fetch(API.registerAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerCreds),
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      const error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    },
    (error) => {
      throw error;
    })
    .then(response => response.json())
    .then((response) => {
      if (response.success) {
        dispatch(receiveRegister);
        const loginCred = {
          username: registerCreds.username,
          password: registerCreds.password,
        };
        // login after successful registration
        dispatch(loginUser(loginCred));
      } else {
        const error = new Error(`Error ${response.status}`);
        error.response = response;
        throw error;
      }
    })
    .catch(error => dispatch(registerError(error.message)));
};

// Logs the user out
export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  localStorage.removeItem('token');
  localStorage.removeItem('creds');
  dispatch(userFailed('Error 401: Unauthorized'));
  dispatch(receiveLogout());
};

// update user profile data, only the user can update profile, not even the admin
export const updateUser = updatedUser => (dispatch) => {
  const bearer = `Bearer ${localStorage.getItem('token')}`;

  return fetch(`${API.userAPI}`, {
    method: 'PUT',
    body: JSON.stringify(updatedUser),
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,
    },
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      const error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    },
    (error) => {
      throw error;
    })
    .then(response => response.json())
    .then((userData) => {
      console.log('User data updated: ', userData);
      dispatch(fetchUser());
    })
    .catch(error => console.log('Error: ', error.message));
};

export const removeOtherUser = uId => (dispatch) => {
  const bearer = `Bearer ${localStorage.getItem('token')}`;

  return fetch(`${API.userAPI}delete/${uId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,
    },
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      const error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    },
    (error) => {
      throw error;
    })
    .then(response => response.json())
    .then((res) => {
      // console.log('User data updated', user);
      console.log(res);
      dispatch(fetchAllUsers());
    })
    .catch(error => console.log('Error: ', error.message));
};

// change password
/*
  {
    "password": "pass",
  }
*/
// export const changePassword = updatedPass => (dispatch) => {
//   const bearer = `Bearer ${localStorage.getItem('token')}`;
//   const creds = localStorage.getItem('creds');
//   creds.password = updatedPass;
//   return fetch(`${API.userAPI}changePassword`, {
//     method: 'PUT',
//     body: JSON.stringify(creds),
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: bearer,
//     },
//     credentials: 'same-origin',
//   })
//     .then((response) => {
//       if (response.ok) {
//         return response;
//       }
//       const error = new Error(`Error ${response.status}: ${response.statusText}`);
//       error.response = response;
//       throw error;
//     },
//     (error) => {
//       throw error;
//     })
//     .then(response => response.json())
//     .then((user) => {
//       console.log('User password changed', user);
//       dispatch(addUser(user));
//     })
//     .catch(error => dispatch(userFailed(error.message)));
// };

export const editOtherUser = otherUser => (dispatch) => {
  const bearer = `Bearer ${localStorage.getItem('token')}`;

  return fetch(`${API.postManageUserAPI}`, {
    method: 'PUT',
    body: JSON.stringify(otherUser),
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,
    },
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      const error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    },
    (error) => {
      throw error;
    })
    .then(response => response.json())
    .then((allUsers) => {
      console.log('All users: \n', allUsers);
      // dispatch(addAllUsers(allUsers));
      dispatch(fetchAllUsers());
    })
    .catch(error => dispatch(usersFailed(error.message)));
};

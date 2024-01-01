export const setUsers = (users) => ({
    type: 'SET_USERS',
    payload: users,
  });
  
  export const selectUser = (userId) => ({
    type: 'SELECT_USER',
    payload: userId,
  });
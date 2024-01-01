import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './utils/api';
import { setUsers } from './redux/actions/userActions';
import UsersTable from './components/UsersTable';
import UserPosts from './components/UserPosts';
import './App.css'

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        dispatch(setUsers(data));
      } catch (error) {
        console.error(error);
      }
    }
    getUsers()
  }, [dispatch]);

  return (
    <div className='app'>
      <UsersTable users={users}  />
      <UserPosts />
    </div>
  );
};

export default App;


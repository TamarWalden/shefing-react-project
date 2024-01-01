import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectUser } from '../redux/actions/userActions';
import { TextField, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import './UsersTable.css';

const UsersTable = ({ users }) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');

  const handleUserClick = (userId) => {
    dispatch(selectUser(userId));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className='userTable'>
      <div>
        <TextField
          label="Search by name or email"
          variant="outlined"
          onChange={(e) => setFilter(e.target.value)}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Company Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} onClick={() => handleUserClick(user.id)}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.company.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersTable;

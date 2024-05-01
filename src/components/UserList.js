// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      fetchUsers();  // Refresh the user list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <Link to="/">Home</Link>
      <Link to="/users/new">Create User</Link>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username} - {user.email}
            <button onClick={() => deleteUser(user._id)}>Delete</button>
            <Link to={`/users/edit/${user._id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UserList.css"; // 추가된 CSS 파일을 가져옵니다.

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // const deleteUser = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:3001/users/${id}`);
  //     fetchUsers(); // Refresh the user list after deletion
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //   }
  // };

  return (
    <div className="container">
      <div className="button-container">
        <Link to="/" className="button large-button">
          홈
        </Link>
        <Link to="/users/new" className="button large-button">
          사용자 추가
        </Link>
      </div>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user._id}>
            <div className="user-info">
              {user.username} - {user.email}
            </div>
            <div className="user-buttons">
              <Link to={`/users/edit/${user._id}`} className="button">
                개인정보 수정
              </Link>
              <Link to={`/users/delete/${user._id}`} className="button">
                사용자 삭제
              </Link>
              {/* <button className="button" onClick={() => deleteUser(user._id)}>
                사용자 삭제
              </button> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;

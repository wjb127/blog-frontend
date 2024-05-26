import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./UserForm.css"; // 추가된 CSS 파일을 가져옵니다.

function UserForm() {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchUser(id);
    }
  }, [id]);

  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching the user:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:3001/users/${id}`, user);
      } else {
        await axios.post("http://localhost:3001/users", user);
      }
      navigate("/users"); // Redirect to the user list after form submission
    } catch (error) {
      console.error("Error submitting the user:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
      </label>
      <div className="button-container">
        <button type="submit">{id ? "Update" : "Create"}</button>
      </div>
    </form>
  );
}

export default UserForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./PostForm.css";

const PostForm = () => {
  const [post, setPost] = useState({ title: "", content: "", username: "" });
  const [users, setUsers] = useState([]); // 작성자 목록 상태 추가
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(); // 작성자 목록을 가져옵니다.
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/users"); // 작성자 목록을 가져옵니다.
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchPost = async (postId) => {
    try {
      const response = await axios.get(`http://localhost:3001/posts/${postId}`);
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching the post:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!post.title || !post.username || !post.content) {
      alert("모든 필드를 입력하세요.");
      return;
    }

    console.log("Submitting post:", post); // 요청 데이터 확인
    try {
      if (id) {
        await axios.put(`http://localhost:3001/posts/${id}`, post);
      } else {
        await axios.post("http://localhost:3001/posts", post);
      }
      navigate("/posts");
    } catch (error) {
      console.error("Error submitting the post:", error); // 에러 메시지 출력
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    navigate("/posts");
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label>
        제목:
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={post.title}
          onChange={handleChange}
        />
      </label>
      <label>
        작성자:
        <select name="username" value={post.username} onChange={handleChange}>
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>
      </label>
      <label>
        내용:
        <textarea
          name="content"
          placeholder="Content"
          value={post.content}
          onChange={handleChange}
        ></textarea>
      </label>
      <div className="button-container">
        <button type="submit">포스팅</button>
        <button type="button" className="cancel-button" onClick={handleCancel}>
          취소
        </button>
      </div>
    </form>
  );
};

export default PostForm;

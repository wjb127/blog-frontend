import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./PostList.css"; // 추가된 CSS 파일을 가져옵니다.

function PostList() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // const deletePost = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:3001/posts/${id}`);
  //     fetchPosts();
  //   } catch (error) {
  //     console.error("Error deleting post:", error);
  //   }
  // };

  const handleTitleClick = (post) => {
    setSelectedPost(post);
  };

  return (
    <div className="container">
      <div className="button-container">
        <Link to="/" className="button large-button">
          홈
        </Link>
        <Link to="/posts/new" className="button large-button">
          글쓰기
        </Link>
      </div>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post._id}>
            <span className="post-title" onClick={() => handleTitleClick(post)}>
              {post.title}
            </span>
            <div>
              <Link to={`/posts/edit/${post._id}`} className="button">
                편집
              </Link>
              <Link to={`/posts/delete/${post._id}`} className="button">
                삭제
              </Link>
              {/* <button className="button" onClick={() => deletePost(post._id)}>
                삭제
              </button> */}
            </div>
          </li>
        ))}
      </ul>
      {selectedPost && (
        <div className="post-content">
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.content}</p>
          <p>{selectedPost.author}</p>
        </div>
      )}
    </div>
  );
}

export default PostList;

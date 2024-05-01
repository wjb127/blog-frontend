import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ title: '', content: '' });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const addOrUpdatePost = async () => {
    if (editing) {
      await axios.put(`http://localhost:3001/posts/${post._id}`, post);
    } else {
      await axios.post('http://localhost:3001/posts', post);
    }
    setPost({ title: '', content: '' }); // 폼 초기화
    setEditing(false);
    fetchPosts();
  };

  const editPost = (post) => {
    setPost(post);
    setEditing(true);
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/posts/${id}`);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      <input
        type="text"
        name="title"
        value={post.title}
        onChange={handleInputChange}
        placeholder="Title"
      />
      <textarea
        name="content"
        value={post.content}
        onChange={handleInputChange}
        placeholder="Content"
      />
      <button onClick={addOrUpdatePost}>{editing ? 'Update' : 'Add'}</button>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <h2 onClick={() => editPost(post)}>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => editPost(post)}>Edit</button>
            <button onClick={() => deletePost(post._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;

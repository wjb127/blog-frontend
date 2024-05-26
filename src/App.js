import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import Home from "./components/Home";
import CategoryList from "./components/CategoryList";
import CategoryForm from "./components/CategoryForm";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

// users 및 caterogies를 위한 라우트를 추가합니다.
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/users" element={<UserList />} />
        <Route path="/users/new" element={<UserForm />} />
        <Route path="/users/edit/:id" element={<UserForm />} />

        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/new" element={<CategoryForm />} />
        <Route path="/categories/edit/:id" element={<CategoryForm />} />

        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/new" element={<PostForm />} />
        <Route path="/posts/edit/:id" element={<PostForm />} />
        
      </Routes>
    </Router>
  );
}

export default App;

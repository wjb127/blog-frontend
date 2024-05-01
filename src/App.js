import React from 'react';
import PostList from './components/PostList';  // PostList 컴포넌트 임포트

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Blog Posts</h1>
      </header>
      <PostList />  // PostList 컴포넌트 렌더링
    </div>
  );
}

export default App;

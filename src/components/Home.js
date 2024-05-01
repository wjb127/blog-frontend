// src/components/Home.js
import React from "react";

function Home() {
  // users 및 caterogies를 위한 라우트를 추가합니다.
  return (
    <div>
      <h1>Welcome to the Blog!</h1>
      <div>
        <p>
          블로그에 오신 것을 환영합니다! 현재 사용자 및 카테고리를 관리하는
          기능만 구현되어 있습니다.
        </p>
        <p>아래 버튼 클릭해서 사용자 및 카테고리를 관리하세요. </p>

        <div style={{ marginTop: "20px" }}>
          <button
            style={{
              marginRight: "10px",
              padding: "8px 16px",
              backgroundColor: "lightblue",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            <a href="/users">Users</a>
          </button>
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: "lightblue",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            <a href="/categories">Categories</a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;

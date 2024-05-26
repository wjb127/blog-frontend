import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // 추가된 CSS 파일을 가져옵니다.

function Home() {
  return (
    <div className="home-container">
      <h1>블로그에 오신 것을 환영합니다!</h1>
      <div>
        <p>
          블로그에 오신 것을 환영합니다! 여기에서 사용자를 관리하고, 카테고리를
          설정하며, 게시물을 작성할 수 있습니다. 여러분을 위한 다양한 기능을
          탐험해보세요.
        </p>
        <p>아래 버튼을 클릭하여 블로그 콘텐츠 관리를 시작하세요:</p>

        <div className="button-container">
          <Link to="/users" className="button">
            사용자 관리
          </Link>
          <Link to="/categories" className="button">
            카테고리 관리
          </Link>
          <Link to="/posts" className="button">
            게시물 관리
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

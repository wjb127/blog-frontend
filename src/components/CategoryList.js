import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/categories/${id}`);
      fetchCategories(); // Refresh the category list
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    // 홈페이지로 돌아가는 링크를 추가하고, 카테고리 생성 페이지로 이동하는 링크를 추가합니다.
    // 각 카테고리에 대한 이름과 설명을 표시하고, 수정 및 삭제 링크를 추가합니다.
    // 삭제 버튼을 클릭하면 해당 카테고리를 삭제하고 카테고리 목록을 새로고침합니다.
    // 카테고리 목록을 표시하는 데 사용되는 코드는 다음과 같습니다.
    // src/components/CategoryList.js

    <div>
      <h1>Categories</h1>
      <Link to="/">Home</Link>
      <Link to="/categories/new">Create Category</Link>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
            <Link to={`/categories/edit/${category._id}`}>Edit</Link>
            <button onClick={() => deleteCategory(category._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;

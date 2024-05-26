// This component is used to create or update a category.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// The CategoryForm component is used to create or update a category.
function CategoryForm() {
  const [category, setCategory] = useState({ name: '', description: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchCategory(id);
    }
  }, [id]);

  const fetchCategory = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:3001/categories/${categoryId}`);
      setCategory(response.data);
    } catch (error) {
      console.error('Error fetching the category:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:3001/categories/${id}`, category);
      } else {
        await axios.post('http://localhost:3001/categories', category);
      }
      navigate('/categories'); // Redirect to the category list after form submission
    } catch (error) {
      console.error('Error submitting the category:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCategory(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={category.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={category.description}
          onChange={handleChange}
        />
      </label>
      <button type="submit">{id ? 'Update' : 'Create'}</button>
    </form>
  );
}

export default CategoryForm;

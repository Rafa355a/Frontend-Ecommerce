import React from 'react';
import { Link } from 'react-router-dom';

const CategoryDropdown = ({ categories }) => {
  return (
    <div className="dropdown-menu">
      {categories.map(category => (
        <Link key={category.id} to={`/category/${category.id}`} className="dropdown-item">
          {category.nombre}
        </Link>
      ))}
    </div>
  );
};

export default CategoryDropdown;

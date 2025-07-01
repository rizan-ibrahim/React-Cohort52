import React, { useState } from "react";
import "./App.css";
import categoriesData from "./fake-data/all-categories.js";
import productsData from "./fake-data/all-products.js";

const App = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  const handleCategoryClick = (category) => {
    if (activeCategory === category) {
      setActiveCategory(null);
      setFilteredProducts(productsData);
    } else {
      setActiveCategory(category);
      const filtered = productsData.filter((product) =>
        product.category
          .toLowerCase()
          .includes(category.toLowerCase().replace("fake:", "").trim())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="App">
      <h1>Products</h1>
      {/* CATEGORY BUTTONS */}
      <div className="categories">
        {categoriesData.map((category) => (
          <button
            key={category}
            className={activeCategory === category ? "active" : ""}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* PRODUCT LIST */}
      <div className="products">
        {(activeCategory ? filteredProducts : productsData).map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

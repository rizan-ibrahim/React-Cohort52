import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchCategories, fetchProducts } from "./services/api";
import CategoryButton from "./components/CategoryButton.jsx";
import ProductCard from "./components/ProductCard.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import useFetch from "./hooks/useFetch";
import Navbar from "./components/Navbar";
import Favourites from "./components/Favourites";
import "./App.css";

const App = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);

  const {
    data: products,
    loading: loadingProducts,
    error: errorProducts,
  } = useFetch(fetchProducts, activeCategory);
  const {
    data: categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useFetch(fetchCategories);

  const handleCategoryClick = (category) => {
    if (activeCategory === category) {
      setActiveCategory(null);
      setFilteredProducts(products);
    } else {
      setActiveCategory(category);
      const filtered = products.filter((product) =>
        product.category.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleHomeClick = () => {
    setActiveCategory(null);
    setFilteredProducts(null);
  };

  if (loadingProducts || loadingCategories) return <div>Loading...</div>;
  if (errorProducts || errorCategories)
    return <div>Error: {errorProducts || errorCategories}</div>;

  return (
    <Router>
      <Navbar onHomeClick={handleHomeClick} />
      <Routes>
        <Route path="/favourites" element={<Favourites />} />
        <Route
          path="/"
          element={
            <div className="App">
              <h1>Products</h1>

              {/* CATEGORY BUTTONS */}
              <div className="categories">
                {categories.map((category) => (
                  <CategoryButton
                    key={category}
                    category={category}
                    isActive={activeCategory === category}
                    onClick={handleCategoryClick}
                  />
                ))}
              </div>

              {/* PRODUCT LIST */}
              <div className="products">
                {(activeCategory ? filteredProducts : products).map(
                  (product) => (
                    <ProductCard key={product.id} product={product} />
                  )
                )}
              </div>
            </div>
          }
        />

        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

export default App;

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchCategories, fetchProducts } from "./services/api";
import CategoryButton from "./components/CategoryButton.jsx";
import ProductCard from "./components/ProductCard.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import "./App.css";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories from the API
  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (err) {
        setError("Failed to fetch categories: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  // Fetch products based on the active category
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const productsData = await fetchProducts(activeCategory);
        setProducts(productsData);
      } catch (err) {
        setError("Failed to fetch products: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [activeCategory]);

  const handleCategoryClick = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Router>
      <Routes>
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
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
                ;
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

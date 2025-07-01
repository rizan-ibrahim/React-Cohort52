import React, { useEffect, useState } from "react";
import { useFavourites } from "../context/FavouritesContext";
import { fetchProduct } from "../services/api";
import ProductCard from "./ProductCard";

const Favourites = () => {
  const { favourites } = useFavourites();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFavourites = async () => {
      setLoading(true);
      try {
        const promises = favourites.map((id) => fetchProduct(id));
        const results = await Promise.all(promises);
        setProducts(results);
      } catch (err) {
        console.error("Failed to load favourites", err);
      } finally {
        setLoading(false);
      }
    };

    if (favourites.length > 0) {
      getFavourites();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [favourites]);

  if (loading) return <div>Loading favourites...</div>;

  return (
    <div className="favourites-page">
      <h2>Your Favourites</h2>
      {products.length === 0 ? (
        <p>No favourites yet.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;

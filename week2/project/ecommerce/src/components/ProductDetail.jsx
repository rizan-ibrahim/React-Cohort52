// src/components/ProductDetail.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../services/api";

const ProductDetail = () => {
  const { id } = useParams(); // Get product id from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        const selectedProduct = data.find(
          (product) => product.id === parseInt(id)
        );
        setProduct(selectedProduct);
      } catch (err) {
        setError("Failed to fetch product details" + err.message);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {product ? (
        <>
          <h2>{product.title}</h2>
          <img src={product.image} alt={product.title} />
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
        </>
      ) : (
        <div>Product not found</div>
      )}
    </div>
  );
};

export default ProductDetail;

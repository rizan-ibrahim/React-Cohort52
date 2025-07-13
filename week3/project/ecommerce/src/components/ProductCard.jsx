import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";
import heartFilled from "../assets/heart-solid.svg?url";
import heartEmpty from "../assets/heart-regular.svg?url";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const { id, image, title, description, price } = product;
  const { toggleFavourite, isFavourite } = useFavourites();

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };
  return (
    <div className="product" onClick={handleCardClick}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavourite(id);
        }}
        className="heart-button"
      >
        <img
          src={isFavourite(id) ? heartFilled : heartEmpty}
          alt="heart"
          style={{ width: "24px", height: "24px" }}
        />
      </button>
      <img src={image} alt={title} className="product-img" />

      <h3>{title}</h3>
      <p>{description}</p>
      <p>${price}</p>
    </div>
  );
};
console.log("❤️ heartFilled URL:", heartFilled);
console.log("🤍 heartEmpty URL:", heartEmpty);

export default ProductCard;

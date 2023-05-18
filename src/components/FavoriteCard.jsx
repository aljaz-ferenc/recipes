import { useState } from "react";
import { getImageURL } from "../api/api";
import "./FavoriteCard.scss";
import { useNavigate } from "react-router";
import { tameText } from "../functions/utils";

export default function FavoriteCard({ ...recipe }) {
  const [image, setImage] = useState(null);
  const favRecipe = recipe.recipe.recipe;
  const navigate = useNavigate();

  getImageURL(favRecipe.id).then((url) => setImage(url));

  return (
    <div
      onClick={() => navigate(`../recipes/${favRecipe.id}`)}
      className="favorite-card"
    >
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="favorite-card__image-container"
      ></div>
      <div className="favorite-card__text">
        <h3>{favRecipe.name}</h3>
        <p>{tameText(favRecipe.description, 100)}</p>
      </div>
    </div>
  );
}

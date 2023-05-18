import "./RecipeCard.scss";
import { useNavigate } from "react-router";
import { getImageURL } from "../api/api";
import { useEffect, useState } from "react";
import { tameText } from "../functions/utils";

export default function RecipeCard({ recipe }) {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getImageURL(recipe.id).then((url) => setImage(url));
  }, []);

  return (
    <div
      className="recipe-card"
      onClick={() => navigate(`recipes/${recipe.id}`)}
    >
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="recipe-card__image-conainer"
      ></div>
      <div className="recipe-card__text" style={{ padding: ".5rem" }}>
        <h3 className="recipe-card__name">{recipe.name}</h3>
        <p className="recipe-card__description">
          {tameText(recipe.description, 100)}{" "}
        </p>
        <div className="rating"></div>
      </div>
    </div>
  );
}

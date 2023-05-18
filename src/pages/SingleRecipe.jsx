import { useParams } from "react-router";
import "../index.scss";
import {
  addToFavorites,
  getImageURL,
  getRecipeById,
  removeFromFavorites,
  updateLikes,
  addLikedRecipe,
  addDislikedRecipe,
  removeDislikedRecipe,
  removeLikedRecipe,
  getFavorites,
} from "../api/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Comments from "../components/Comments";
import Avatar from "boring-avatars";

export default function SingleRecipe() {
  const [recipe, setRecipe] = useState(null);
  const { recipeId } = useParams();
  const user = useSelector((state) => state.user);
  const userId = user.id;
  const [favorites, setFavorites] = useState([]);
  const [image, setImage] = useState(null);
  const [liked, setLiked] = useState(null);
  const [likes, setLikes] = useState(null);

  useEffect(() => {
    getFavorites(userId).then((favs) => {
      setFavorites(favs);
    });
    getRecipeById(recipeId)
      .then((recipe) => {
        setRecipe(recipe);
      })
      .catch((error) => console.log(error.message));

    getImageURL(recipeId).then((url) => setImage(url));
  }, [userId, recipeId]);

  async function handleAddToFavorites() {
    await addToFavorites(recipeId, userId);
    getFavorites(userId).then((favs) => {
      setFavorites(favs);
    });
  }

  if (!recipe) {
    return <h1>Loading...</h1>;
  }

  function isInFavorites(recipeId) {
    if (favorites.includes(recipeId)) {
      return true;
    } else {
      return false;
    }
  }

  async function handleRemoveFromFavorites() {
    await removeFromFavorites(userId, recipeId);
    getFavorites(userId).then((favs) => {
      setFavorites(favs);
    });
  }

  isInFavorites(recipeId);

  return (
    <div className="single-recipe">
      <div className="single-recipe__image">
        <div>
          <h1 className="single-recipe__title">{recipe.name}</h1>
          <div className="single-recipe__description">{recipe.description}</div>
          <div className="single-recipe__posted-by">
            <p>
              Posted by: {recipe.authorUsername}{" "}
              <Avatar variant="beam" name={user.username} />
            </p>
            <p>on {new Date(recipe.date).toLocaleDateString()}</p>
          </div>
          <div className="time">
            <div className="time__prep-time">
              <p>Prep Time:</p>
              <p>{recipe.prepTime}</p>
            </div>
            <div className="time__cook-time">
              <p>Cook Time:</p>
              <p>{recipe.cookTime}</p>
            </div>
            <div className="time__servings">
              <p>Servings:</p>
              <p>{recipe.servings}</p>
            </div>
          </div>
        </div>
        {image && <img src={image} alt="" />}
      </div>
      <div className="single-recipe__buttons">
        <div className="add-to-favorites">
          {!isInFavorites(recipeId) && (
            <button
              onClick={handleAddToFavorites}
              className="add-to-favorites__btn"
            >
              Add to favorites
            </button>
          )}
          {isInFavorites(recipeId) && (
            <button
              onClick={handleRemoveFromFavorites}
              className="add-to-favorites__btn"
            >
              Remove from favorites
            </button>
          )}
        </div>
      </div>
      <section className="grid">
        <h2>INGREDIENTS</h2>
        <h2>INSTRUCTIONS</h2>
        <table className="ingredients">
          <tbody>
            {recipe.ingredients.map((ing, i) => (
              <tr key={i}>
                <td className="ingredient">{ing.ingredient}</td>
                <td>{ing.amount}</td>
                <td>{ing.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="steps">
          {recipe.steps.map((step, i) => (
            <p key={i}>
              {i + 1}: {step}
            </p>
          ))}
        </div>
      </section>
      <section className="single-recipe__notes">
        <h2>NOTES</h2>
        <p>{recipe.notes}</p>
      </section>
      <section className="comments">
        <Comments userId={userId} recipeId={recipeId} />
      </section>
    </div>
  );
}

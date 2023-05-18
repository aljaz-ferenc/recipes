import { useEffect, useState } from "react";
import "../index.scss";
import { getFavoriteRecipes, getFavorites } from "../api/api";
import FavoriteCard from "../components/FavoriteCard";
import { useSelector } from "react-redux";


export default function Favorites() {
  const userId = useSelector((state) => state.user.id);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!userId) return;
    getFavorites(userId).then((favorites) => {
      getFavoriteRecipes(favorites).then((recipes) => setFavorites(recipes));
    });
  }, [userId]);

  return (
    <div className="favorites">
      <h2>My Favorite Recipes</h2>
      {favorites.length > 0 &&
        favorites.map((recipe) => (
          <FavoriteCard recipe={{ recipe }} key={recipe.id} />
        ))}
      {favorites.length === 0 && <p>You don't have any favorites yet...</p>}
    </div>
  );
}

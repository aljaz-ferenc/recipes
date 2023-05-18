import { useLoaderData } from "react-router";
import { getRecipesByUser } from "../api/api";
import "./MyRecipes.scss";
import { store } from "../store/store";
import { Link } from "react-router-dom";

export default function MyRecipes() {
  const recipes = useLoaderData();

  return (
    <div className="my-recipes">
      <h3>My Recipes</h3>
      {recipes.map((recipe) => (
        <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
          {recipe.name}
        </Link>
      ))}
    </div>
  );
}

export async function loader() {
  const state = store.getState();
  let recipes = [];
  await getRecipesByUser(state.user.id).then((rec) => (recipes = [...rec]));
  return recipes;
}

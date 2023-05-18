import "../index.scss";
import Filter from "../components/Filter.jsx";
import Recipes from "../pages/Recipes";
import { getAllRecipes } from "../api/api";
import { store } from "../store/store";
import { useState } from "react";

export default function RecipesLayout() {
  const [cuisine, setCuisine] = useState([]);
  const [type, setType] = useState([]);
  const [diet, setDiet] = useState([]);

  return (
    <div className="recipes-layout">
      <Filter
        cuisineArray={cuisine}
        typeArray={type}
        dietArray={diet}
        setType={setType}
        setCuisine={setCuisine}
        setDiet={setDiet}
      />
      <Recipes cuisine={cuisine} type={type} diet={diet} />
    </div>
  );
}

export async function loader() {
  const state = store.getState();
  let recipes = [];

  if (!state.user) {
    return null;
  } else {
    await getAllRecipes().then((data) => (recipes = data));
    return recipes;
  }
}

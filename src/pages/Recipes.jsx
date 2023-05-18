import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import "../index.scss";
import { useLoaderData } from "react-router";

export default function Recipes({ cuisine, type, diet }) {
  const allRecipes = useLoaderData();
  const [displayedRecipes, setDisplayedRecipes] = useState(allRecipes);

  useEffect(() => {
    const categories = [...cuisine, ...type, ...diet];
    const displayed = [];

    if (categories.length === 0) {
      setDisplayedRecipes([...allRecipes]);
    } else {
      allRecipes.forEach((recipe) => {
        const array = [
          ...recipe.diet,
          ...recipe.mealType,
          ...recipe.cuisine,
          ...categories,
        ];
        const set = new Set(array);
        if (array.length !== set.size) {
          displayed.push(recipe);
        }
      });

      setDisplayedRecipes(displayed);
    }
  }, [cuisine, type, diet]);

  return (
    <div className="recipes">
      {displayedRecipes &&
        displayedRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
    </div>
  );
}

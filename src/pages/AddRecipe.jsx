import { Form, useNavigate } from "react-router-dom";
import "../index.scss";
import { addRecipe, uploadImage } from "../api/api";
import { useState } from "react";
import { store } from "../store/store";
import { titleCase } from "../functions/utils";

export default function AddRecipe() {
  const [ingredientsCount, setIngredientsCount] = useState([1]);
  const [stepsCount, setStepsCount] = useState([1]);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const recipeId = crypto.randomUUID();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cuisines = ["mexican", "italian", "indian", "chinese"];
  const types = [
    "breakfast",
    "lunch",
    "dinner",
    "snacks",
    "desserts",
    "appetizers",
    "fast-food",
  ];
  const diets = [
    "vegetarian",
    "vegan",
    "gluten-free",
    "dairy-free",
    "keto",
    "paleo",
  ];

  function handleAddIngredientInput(e) {
    e.preventDefault();
    setIngredientsCount((count) => [...count, count.length + 1]);
  }

  function addStepInput(e) {
    e.preventDefault();
    setStepsCount((count) => [...count, count.length + 1]);
  }

  async function handleSubmit(e) {
    await uploadImage(image, recipeId);
    setIsSubmitting(true);
    navigate(`../profile/my-recipes`);
    setIsSubmitting(true);
  }

  return (
    <Form onSubmit={handleSubmit} className="add-recipe" method="post">
      <h2>New Recipe</h2>
      <fieldset>
        <legend>TITLE</legend>
        <div className="input-group">
          <input name="name" type="text" id="add__title" />
        </div>
      </fieldset>
      <fieldset>
        <legend>DESCRIPTION</legend>
        <div className="input-group">
          <textarea
            maxLength={200}
            name="description"
            type="text"
            id="add__description"
            rows={5}
          />
        </div>
      </fieldset>
      <fieldset>
        <legend>CATEGORY</legend>
        <div className="add-recipe__category">
          <div className="add-recipe__category--cuisine">
            <h4>Cuisine</h4>
            {cuisines.map((cuisine, i) => (
              <div key={`cuisine${i}`}>
                <label htmlFor={cuisine}>{titleCase(cuisine)}</label>
                <input
                  name={`cuisine-${cuisine}`}
                  id={cuisine}
                  type="checkbox"
                />
              </div>
            ))}
          </div>
          <div className="add-recipe__category--type">
            <h4>Type</h4>
            {types.map((type, i) => (
              <div key={`type${i}`}>
                <label htmlFor={type}>{titleCase(type)}</label>
                <input name={`type-${type}`} id={type} type="checkbox" />
              </div>
            ))}
          </div>
          <div className="add-recipe__category--diet">
            <h4>Diet</h4>
            {diets.map((diet, i) => (
              <div key={`diet${i}`}>
                <label htmlFor={diet}>{titleCase(diet)}</label>
                <input name={`diet-${diet}`} id={diet} type="checkbox" />
              </div>
            ))}
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>TIME AND YIELD</legend>
        <div className="input-group">
          <label htmlFor="prep-time">Prep time</label>
          <input type="text" id="prep-time" name="prepTime" />
        </div>
        <div className="input-group">
          <label htmlFor="cook-time">Cook time</label>
          <input type="text" id="cook-time" name="cookTime" />
        </div>
        <div className="input-group">
          <label htmlFor="servings">Servings</label>
          <input type="number" id="servings" name="servings" />
        </div>
      </fieldset>
      <div className="add-image">
        <fieldset>
          <legend>UPLOAD IMAGE</legend>
          <div className="input-group">
            <input
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
            />
          </div>
        </fieldset>
      </div>
      <div className="add-recipe__ingredients">
        <fieldset>
          <legend>INGREDIENTS</legend>
          {ingredientsCount.map((count, id) => (
            <div key={id} className="ingredient-input-container">
              <div className="input-group">
                <label htmlFor={`ingredient${id}`}>Ingredient</label>
                <input
                  name={`ingredient${id}`}
                  type="text"
                  id={`ingredient${id}`}
                />
              </div>
              <div className="input-group">
                <label htmlFor={`amount${id}`}>Amount</label>
                <input type="text" id={`amount${id}`} name={`amount${id}`} />
              </div>
            </div>
          ))}
          <button onClick={handleAddIngredientInput}>
            Add another ingredient
          </button>
        </fieldset>
      </div>
      <div className="add-recipe__steps">
        <fieldset>
          <legend>INSTRUCTIONS</legend>
          <div className="steps-input__container">
            {stepsCount.map((step, id) => (
              <div key={id} className="input-group">
                <label htmlFor={`step${id}`}>Step {id + 1}</label>
                <textarea
                  name={`step${id}`}
                  id={`step${id}`}
                  cols="30"
                  rows="5"
                ></textarea>
              </div>
            ))}
          </div>
          <button onClick={addStepInput}>Add another step</button>
        </fieldset>
      </div>
      <div className="add-recipe__notes">
        <fieldset>
          <legend>ADDITIONAL NOTES</legend>
          <div className="input-group">
            <textarea name="notes" id="notes" cols="30" rows="5"></textarea>
          </div>
        </fieldset>
      </div>
      <button className="add-recipe__submit-btn">
        {isSubmitting ? "Please wait..." : "SUBMIT RECIPE"}
      </button>
      <input
        name="id"
        style={{ visibility: "hidden" }}
        readOnly
        value={recipeId.toString()}
        type="text"
      />
    </Form>
  );
}

export async function addRecipeAction({ request }) {
  const state = store.getState();

  const obj = {};
  const recipe = {};
  const allIngredients = [];
  const allAmounts = [];
  const ingredients = [];
  const steps = [];
  const cuisine = [];
  const mealType = [];
  const diet = [];

  const formData = await request.formData();

  for (const pair of formData.entries()) {
    obj[pair[0]] = pair[1];
  }

  for (const key in obj) {
    if (key === "name" || key === "id" || key === "description") {
      recipe.name = obj.name;
      recipe.description = obj.description;
      recipe.id = obj.id;
    } else if (key.toString().startsWith("ingredient")) {
      allIngredients.push(obj[key]);
    } else if (key.toString().startsWith("amount")) {
      allAmounts.push(obj[key]);
    }
    if (key.startsWith("cuisine-")) {
      cuisine.push(key.slice(8));
    }
    if (key.startsWith("type-")) {
      mealType.push(key.slice(5));
    }
    if (key.startsWith("diet-")) {
      diet.push(key.slice(5));
    }
  }

  for (const key in obj) {
    if (key.toString().startsWith("step")) {
      steps.push(obj[key]);
    }
  }
  recipe.steps = steps;

  allIngredients.forEach((ing, i) => {
    ingredients.push({
      ingredient: ing,
      amount: allAmounts.at(i),
    });
  });
  recipe.id = obj.id;
  recipe.ingredients = ingredients;
  recipe.notes = obj.notes;
  recipe.prepTime = obj["prepTime"];
  recipe.cookTime = obj["cookTime"];
  recipe.servings = obj["servings"];
  recipe.ratedBy = [];
  recipe.authorId = state.user.id;
  recipe.authorUsername = state.user.username;
  recipe.cuisine = cuisine;
  recipe.mealType = mealType;
  recipe.diet = diet;

  await addRecipe(recipe);
  return recipe;
}

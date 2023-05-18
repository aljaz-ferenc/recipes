import { Form } from "react-router-dom";
import "./Filter.scss";

export default function Filter({
  setType,
  setCuisine,
  setDiet,
  cuisineArray,
  typeArray,
  dietArray,
}) {
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

  function capizalize(word) {
    return word.split("").at(0).toUpperCase() + word.slice(1);
  }

  function setFilterState(cuisine, isChecked, filter) {
    switch (filter) {
      case "cuisine":
        {
          if (isChecked) {
            setCuisine((prev) => [...prev, cuisine]);
          } else {
            const newCuisines = cuisineArray.filter((cui) => cui !== cuisine);
            setCuisine(newCuisines);
          }
        }
        break;
      case "type":
        {
          if (isChecked) {
            setType((prev) => [...prev, cuisine]);
          } else {
            const newTypes = typeArray.filter((ty) => ty !== cuisine);
            setType(newTypes);
          }
        }
        break;
      case "diet":
        {
          if (isChecked) {
            setDiet((prev) => [...prev, cuisine]);
          } else {
            const newDiets = dietArray.filter((di) => di !== cuisine);
            setDiet(newDiets);
          }
        }
        break;
    }
  }

  return (
    <Form className="filter">
      <h3>Filter by</h3>
      <div className="filter__cuisine">
        <h4>Cuisine</h4>
        {cuisines.map((cuisine, i) => (
          <div key={`cuisine${i}`}>
            <input
              data-filter="cuisine"
              value={cuisine}
              onChange={(e) =>
                setFilterState(
                  e.target.value,
                  e.target.checked,
                  e.target.dataset.filter
                )
              }
              id={cuisine}
              type="checkbox"
            />
            <label htmlFor={cuisine}>{capizalize(cuisine)}</label>
          </div>
        ))}
      </div>
      <div className="filter__type">
        <h4>Type</h4>
        {types.map((type, i) => (
          <div key={`type${i}`}>
            <input
              onChange={(e) =>
                setFilterState(
                  e.target.value,
                  e.target.checked,
                  e.target.dataset.filter
                )
              }
              data-filter="type"
              id={type}
              type="checkbox"
              value={type}
            />
            <label htmlFor={type}>{capizalize(type)}</label>
          </div>
        ))}
      </div>
      <div className="filter__diet">
        <h4>Diet</h4>
        {diets.map((diet, i) => (
          <div key={`diet${i}`}>
            <input
              onChange={(e) =>
                setFilterState(
                  e.target.value,
                  e.target.checked,
                  e.target.dataset.filter
                )
              }
              data-filter="diet"
              id={diet}
              type="checkbox"
              value={diet}
            />
            <label htmlFor={diet}>{capizalize(diet)}</label>
          </div>
        ))}
      </div>
    </Form>
  );
}

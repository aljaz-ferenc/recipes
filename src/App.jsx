import "./index.scss";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Favorites from "./pages/Favorites";
import AddRecipe, { addRecipeAction } from "./pages/AddRecipe";
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Login";
import RecipesLayout, {
  loader as recipesLoader,
} from "./layouts/RecipesLayout";
import SingleRecipe from "./pages/SingleRecipe";
import ProfileLayout from "./layouts/ProfileLayout";
import Account from "./components/Account";
import MyRecipes, { loader as myRecipesLoader } from "./components/MyRecipes";
import ShoppingList from "./components/ShoppingList";
import Error from "./pages/Error";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route errorElement={<Error />}>
        <Route path="login" element={<Login />} />
        <Route element={<RootLayout />}>
          <Route path="/" loader={recipesLoader} element={<RecipesLayout />} />
          <Route path="recipes/:recipeId" element={<SingleRecipe />} />
          <Route path="favorites" element={<Favorites />} />
          <Route
            path="add-recipe"
            action={addRecipeAction}
            element={<AddRecipe />}
          />
          <Route path="profile" element={<ProfileLayout />}>
            <Route element={<Account />} path="account" />
            <Route
              element={<MyRecipes />}
              loader={myRecipesLoader}
              path="my-recipes"
            />
            <Route element={<ShoppingList />} path="shopping-list" />
          </Route>
        </Route>
      </Route>
    )
  );
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

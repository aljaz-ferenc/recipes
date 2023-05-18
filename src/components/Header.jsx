import { NavLink, useNavigate } from "react-router-dom";
import "./Header.scss";
import Avatar from "boring-avatars";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import { getAuth, signOut } from "firebase/auth";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  async function handleLogout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(userActions.setUser({}));
        navigate("/login");
      })
      .catch((error) => console.log(error));
  }

  return (
    <header className="header">
      <nav className="header__navigation">
        <NavLink to="/">Recipes</NavLink>
        <NavLink to="add-recipe">Add Recipe</NavLink>
        <NavLink className="header__navigation--favorites" to="favorites">
          Favorites
        </NavLink>
        <NavLink to="profile" className="header__navigation--profile">
          <Avatar variant="beam" name={user.username} />
          {user.username}
        </NavLink>
        <button className="header__navigation--logout" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
}

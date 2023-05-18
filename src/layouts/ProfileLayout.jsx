import { NavLink, Outlet } from "react-router-dom";
import "../index.scss";

export default function ProfileLayout() {
  return (
    <section className="profile-layout">
      <nav>
        <NavLink to="my-recipes">My Recipes</NavLink>
        <NavLink to="shopping-list">Shopping List</NavLink>
        <NavLink to="account">Account</NavLink>
      </nav>
      <Outlet />
    </section>
  );
}

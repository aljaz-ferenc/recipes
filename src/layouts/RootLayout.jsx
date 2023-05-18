import { Navigate, Outlet } from "react-router";
import Header from "../components/Header";
import "../index.scss";
import { useSelector } from "react-redux";

export default function RootLayout() {
  const isLoggedIn =
    useSelector((state) => Object.entries(state.user).length) === 0
      ? false
      : true;
  if (!isLoggedIn) {
    return <Navigate to="login" />;
  }
  return (
    <div className="root-layout">
      <Header />
      <Outlet />
    </div>
  );
}

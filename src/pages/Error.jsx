import { useEffect } from "react";
import "../index.scss";
import { useNavigate } from "react-router";
import hamburgerImg from "../assets/hamburger.svg";

export default function Error() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);
  return (
    <div className="error">
      <h1>This page doesn't exist.</h1>
      <img src={hamburgerImg} alt="" />
      <p>Redirecting...</p>
    </div>
  );
}

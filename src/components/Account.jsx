import "./Account.scss";
import { useSelector } from "react-redux";

export default function Account() {
  const user = useSelector((state) => state.user);
  return (
    <div className="account">
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
    </div>
  );
}

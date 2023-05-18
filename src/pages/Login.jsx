import { useDispatch, useSelector } from "react-redux";
import "../index.scss";
import { Form, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { userActions } from "../store/userSlice.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { createUserDocument, uploadImage } from "../api/api";

export default function Login() {
  const [state, setState] = useState("register");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("user123@email.com");
  const [signInPassword, setSignInPassword] = useState("asdf1234");
  const [accCreated, setAccCreated] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.loginStatus);
  const user = useSelector((state) => state.user);

  const imageVariants = {
    initial: {
      x: "50%",
    },
    animate: {
      x: state === "login" ? "-50%" : "50%",
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  async function handleLogin(e) {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, signInEmail, signInPassword)
      .then((userCreadentials) => {
        dispatch(
          userActions.setUser({
            id: userCreadentials.user.uid,
            email: userCreadentials.user.email,
            username: userCreadentials.user.displayName,
          })
        );
        navigate("/");
      })
      .catch((error) => console.log(error.message));
  }

  async function handleRegister() {
    const auth = getAuth();
    if (password === confirmPassword) {
      setCreatingUser(true);
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          updateProfile(userCredentials.user, { displayName: username });
          createUserDocument(userCredentials.user.uid, username);
          setAccCreated(true);
          setState("login");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        })
        .catch((error) => console.log(error.message))
        .finally(() => setCreatingUser(false));
    }
  }

  return (
    <div className="login-container">
      <motion.div
        variants={imageVariants}
        initial="initial"
        animate="animate"
        className="login-container__image"
      ></motion.div>
      <div className="register">
        <fieldset>
          <legend>Register</legend>
          <Form>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </div>
            <div className="input-group">
              <label htmlFor="username">Username:</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirm-password">Confirm password:</label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
              />
            </div>
            {creatingUser ? (
              <button>Creating Account</button>
            ) : (
              <button onClick={handleRegister}>Register</button>
            )}
            <Link onClick={() => setState("login")}>
              Already have an account? Login
            </Link>
          </Form>
        </fieldset>
      </div>
      <div className="login">
        {accCreated && <h3>Account successfully created, you can now login</h3>}
        <fieldset>
          <legend>Login</legend>
          <Form>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                type="email"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                type="password"
              />
            </div>
            <button onClick={handleLogin}>Login</button>
            <Link onClick={() => setState("register")}>
              Don't have an account? Register
            </Link>
          </Form>
        </fieldset>
      </div>
    </div>
  );
}

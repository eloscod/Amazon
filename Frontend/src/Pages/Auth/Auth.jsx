import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import classes from "./SignUp.module.css";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import Logo from "../../assets/Images/amazon_logo_signin.png";
import { type } from "../../Utility/action.type";
import { BeatLoader } from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const [{ user }, dispatch] = useContext(DataContext);
  // console.log(user);
  const navigate = useNavigate();
  const dataLocatoinState = useLocation();
  // console.log(dataLocatoinState);

  const signInHandler = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error messages
    setLoading((prev) => ({ ...prev, signIn: true }));

    try {
      const userInfo = await signInWithEmailAndPassword(auth, email, password);
      // console.log("Signed in:", userInfo);
      dispatch({
        type: type.SET_USER,
        user: userInfo.user,
      });
    } catch (err) {
      console.error("Sign in error:", err);
      setError(err.message);
    } finally {
      setLoading((prev) => ({ ...prev, signIn: false }));
      navigate(dataLocatoinState?.state?.redirect || "/");
    }
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error messages
    setLoading((prev) => ({ ...prev, signUp: true }));

    try {
      const userInfo = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log("Account created:", userInfo);
      dispatch({
        type: type.SET_USER,
        user: userInfo.user,
      });
    } catch (err) {
      console.error("Sign up error:", err);
      setError(err.message);
    } finally {
      setLoading((prev) => ({ ...prev, signUp: false }));
      navigate(dataLocatoinState?.state?.redirect || "/");
    }
  };

  return (
    <section className={classes.login}>
      <Link to="/">
        <img src={Logo} alt="Amazon Logo" />
      </Link>

      <div className={classes.login__container}>
        <h1>Sign in</h1>

        {dataLocatoinState?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {dataLocatoinState?.state?.msg}
          </small>
        )}
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          <button
            name="signin"
            type="submit"
            onClick={signInHandler}
            className={classes.login__signInButton}
            disabled={loading.signIn}
          >
            {loading.signIn ? <BeatLoader color="#000" size={8} /> : "Sign In"}
          </button>
        </form>

        {error && <p className={classes.error}>{error}</p>}

        <p>
          By continuing, you agree to Amazon's{" "}
          <Link to="/terms">Conditions of Use</Link> and{" "}
          <Link to="/privacy">Privacy Notice</Link>.
        </p>

        <button
          name="signup"
          type="submit"
          onClick={signUpHandler}
          className={classes.login__registerBtn}
          disabled={loading.signUp}
        >
          {loading.signUp ? (
            <BeatLoader color="#000" size={8} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
      </div>
    </section>
  );
}

export default Auth;

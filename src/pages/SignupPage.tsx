import { FormEvent, Fragment, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/configs/firebase";
import { Toolbar, Typography } from "@mui/material";

const SignupPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/login");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <Fragment>
      <main className="loginBody">
        <div className="container">
          <div className="screen">
            <div className="screen__content">
              <form className="login">
                <Typography variant="h4" gutterBottom textAlign="center">
                  Jardin-Trip
                </Typography>
                <div className="login__field">
                  <i className="login__icon fas fa-user"></i>

                  <input
                    className="login__input"
                    id="email-address"
                    name="email"
                    type="email"
                    required
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="login__field">
                  <i className="login__icon fas fa-lock"></i>
                  <input
                    className="login__input"
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button className="button login__submit" onClick={onSubmit}>
                  <span className="button__text">Sign up</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
              </form>
              <Toolbar>
                <Typography variant="button" display="block" gutterBottom>
                  Already have an account? <NavLink to="/">Sign in</NavLink>
                </Typography>
              </Toolbar>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default SignupPage;

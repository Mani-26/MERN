import React, { useState } from "react";
import { successSignup, dataIncomplete, somethingWrong, userNotExist, userExist, passwordInSufficient, passwordIncorrect, successLogin, } from "./alerts.js"
import { useNavigate } from "react-router-dom";
import { Icon } from 'react-icons-kit';
import { email } from 'react-icons-kit/ionicons/email'
import { iosPerson } from 'react-icons-kit/ionicons/iosPerson'
import { eyeDisabled } from 'react-icons-kit/ionicons/eyeDisabled'
import { eye } from 'react-icons-kit/ionicons/eye'
import axios from "axios";
const Login = () => {
  const history = useNavigate();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

 function isPasswordValid(password) {
  return passwordRegex.test(password);
}
  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup state
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [role, setRole] = useState("user");
  const [isLoginForm, setIsLoginForm] = useState("true");

  const toggleForm = () => {
    setIsLoginForm((prevValue) => !prevValue);
  };

  const handleRadioChange = (value) => {
    setRole(value);
  };

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
    if (showPassword) {
      setIcon(eye);
    } else {
      setIcon(eyeDisabled)
    }
  };
  const [icon, setIcon] = useState(eyeDisabled);

  async function submitLogin(e) {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/login", {
          email: loginEmail,
          password: loginPassword,
        })
        .then((res) => {
          if (res.data === "incomplete") {
            dataIncomplete();
          } else if (res.data === "owner") {
            localStorage.setItem("role", "owner");
            localStorage.setItem("email", loginEmail);
            localStorage.setItem("isUser", "true");
            successLogin();
            history("/");
          } else if (res.data === "user") {
            successLogin();
            localStorage.setItem("email", loginEmail);
            localStorage.setItem("role", "user");
            localStorage.setItem("isUser", "true");
            history("/");
          } else if (res.data === "wrongPassword") {
            passwordIncorrect();
          } else if (res.data === "notexist") {
            userNotExist();
            setIsLoginForm(false);
          } else if (res.data === "wrongPassword") {
            passwordIncorrect();
          } else {
            localStorage.setItem("email", "guest");
            localStorage.setItem("role", "guest");
            userNotExist();
            setIsLoginForm(false);
          }
          setTimeout(() => {
            window.location.reload();
        }, 2000);
        })
    } catch (e) {
      somethingWrong();
      console.log(e);
    }
  }

  async function submitSignup(e) {
    e.preventDefault();
    if (!(isPasswordValid(signupPassword))) {
      passwordInSufficient();
    }
    else{
    try {
      await axios
        .post("http://localhost:5000/signup", {
          username: signupUsername,
          email: signupEmail,
          password: signupPassword,
          role,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data === "incomplete") {
            dataIncomplete();
          } else if (res.data === "exist") {
            setIsLoginForm(true);
            userExist();
          } else if (res.data === "owner") {
            successSignup();
            localStorage.setItem("role", "owner");
            localStorage.setItem("email", signupEmail);
            localStorage.setItem("isUser", "true");
            history("/");
          } else if (res.data === "user") {
            successSignup();
            localStorage.setItem("role", "user");
            localStorage.setItem("email", signupEmail);
            localStorage.setItem("isUser", "true");
            history("/");
          }
          setTimeout(() => {
            window.location.reload();
        }, 2000);
        })
    } catch (e) {
      somethingWrong();
      console.log(e);
    }
  }
  }

  return (
    <div id="main-block">
      <div className={`wrapper${isLoginForm ? "" : " active"}`}>
        <span className="bg-animatie"></span>
        <span className="bg-animatie2"></span>

        <div className={`form-box login${isLoginForm ? "" : " active"}`}>
          <h2 className="animation" style={{ "--i": 0, "--j": 17 }}>
            Login
          </h2>
          <form action="POST" onSubmit={submitLogin}>
            <div
              className={`input-box animation`}
              style={{ "--i": 1, "--j": 18 }}
            >
              <input
                type="email"
                name="email"
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                }}
                required
              />
              <label>Email ID</label>
              <Icon icon={email} size={20} />
            </div>
            <div
              className={`input-box animation`}
              style={{ "--i": 2, "--j": 19 }}
            >
              <input
                type={showPassword ? "text" : "password"}
                minLength={8}
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                }}
                required
              />
              <Icon icon={icon} size={20} onClick={toggleShowPassword} />
              <label>Password</label>
              <i className="bx bxs-lock-alt"></i>
            </div>
            <button
              type="submit"
              className={`btn animation`}
              style={{ "--i": 3, "--j": 20 }}
            >
              Login
            </button>
            <div
              className={`logreg-link animation`}
              style={{ "--i": 4, "--j": 21 }}
            >
              <p>
                Don't have an account?
                <a
                  href="/"
                  className="register-link"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleForm();
                  }}
                >
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>

        <div className={`info-text login${isLoginForm ? "" : " active"}`}>
          <h2 className="animation" style={{ "--i": 0, "--j": 17 }}>
            CASANEST!
          </h2>
          <p className="animation" style={{ "--i": 1, "--j": 18 }}>
            Welcomes you back -where comfort meets home.
          </p>
        </div>

        <div className={`form-box register${isLoginForm ? " active" : ""}`}>
          <h2 className="animation" style={{ "--i": 17, "--j": 0 }}>
            Sign Up
          </h2>
          <form action="POST" onSubmit={submitSignup}>
            <div
              className={`input-box animation`}
              style={{ "--i": 18, "--j": 1 }}
            >
              <input
                name="username"
                onChange={(e) => {
                  setSignupUsername(e.target.value);
                }}
                type="text"
                required
              />
              <label>Username</label>
              <Icon icon={iosPerson} size={20} />

            </div>
            <div
              className={`input-box animation`}
              style={{ "--i": 19, "--j": 2 }}
            >
              <input
                type="email"
                onChange={(e) => {
                  setSignupEmail(e.target.value);
                }}
                required
              />
              <label>Email</label>
              <Icon icon={email} size={20} />

            </div>
            <div
              className={`input-box animation`}
              style={{ "--i": 20, "--j": 3 }}
            >
              <input
                type={showPassword ? "text" : "password"}
                minLength={8}
                onChange={(e) => {
                  setSignupPassword(e.target.value);
                }}
                required
              />
              <label>Password</label>
              <Icon icon={icon} size={20} onClick={toggleShowPassword} />

            </div>
            <div className="radioGroup">
              <div
                className={`radioButton animation`}
                style={{ "--i": 21, "--j": 4 }}
              >
                <input
                  type="radio"
                  id="owner"
                  value="owner"
                  checked={role === "owner"}
                  onChange={() => handleRadioChange("owner")}
                  required
                />
                <label htmlFor="owner" className="radioLabel">
                  Owner
                </label>
              </div>

              <div
                className={`radioButton animation`}
                style={{ "--i": 21, "--j": 4 }}
              >
                <input
                  type="radio"
                  id="user"
                  value="user"
                  checked={role === "user"}
                  required
                  onChange={() => handleRadioChange("user")}
                />
                <label htmlFor="user" className="radioLabel">
                  User
                </label>
              </div>
            </div>
            <button
              type="submit"
              className={`btn animation`}
              style={{ "--i": 22, "--j": 5 }}
            >
              Sign Up
            </button>
            <div
              className={`logreg-link animation`}
              style={{ "--i": 23, "--j": 6 }}
            >
              <p>
                Already have an account?
                <a
                  href="/"
                  className="login-link"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleForm();
                  }}
                >
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
        <div className={`info-text register${isLoginForm ? " active" : ""}`}>
          <h2 className="animation" style={{ "--i": 17, "--j": 0 }}>
            Welcome!
          </h2>
          <p className="animation" style={{ "--i": 18, "--j": 1 }}>
          Join CasaNest and unlock the door to a cozy home. Sign up today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

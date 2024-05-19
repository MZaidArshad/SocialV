import { useContext, useState } from "react";
import "./loginForm.scss";

import { Link, useNavigate } from "react-router-dom";

import { validate } from "email-validator";

import { signInWithEmailAndPassword } from "firebase/auth";

import { AuthContext } from "../../context/AuthContext";
import GoogleAuthBtn from "../../components/googleAuthBtn/GoogleAuthBtn";
import { auth } from "../../config/firebase";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailAndPassword = () => {
    if (!email.trim() && !password.trim()) {
      alert("auth", "*Enter email and password");
      return;
    }

    if (!validate(email.trim())) {
      alert("*Invalid email");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });

        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("errorMessage ", errorMessage);
        if (errorMessage === "Firebase: Error (auth/invalid-credential).") {
          alert("auth *Invalid email or password");
          return;
        } else if (errorMessage === "Firebase: Error (auth/invalid-email).") {
          alert("email *Invalid email");
          return;
        } else if (
          errorMessage === "Firebase: Error (auth/configuration-not-found)"
        ) {
          alert(
            "No account associated with this email. Please create an account first."
          );
        } else {
          let toastError = `An error occured ${errorMessage}`;
          // window.toastify(toastError, "error");
          console.log(toastError);
        }
      });
  };

  return (
    <section className="text-center text-lg-start AuthForm">
      <div className="container py-4">
        <div className="row g-0 align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div
              className="card cascading-right bg-body-tertiary"
              style={{ backdropFilter: "blur(30px)" }}
            >
              <div className="card-body p-5 shadow-5 text-center">
                <h2 className="fw-bold logo">
                  Social<span>V</span>
                </h2>
                <h2 className="fw-bold mb-5">Welcome back</h2>
                <div>
                  {/* <!-- Email input --> */}
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {/* <!-- Password input --> */}
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="authForm_link">
                    <Link className="authForm_link_link">Forgot password</Link>
                  </div>

                  {/* <!-- Submit button --> */}
                  <button
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-primary btn-block mb-4"
                    onClick={handleEmailAndPassword}
                  >
                    Login
                  </button>

                  <div className="authForm_link">
                    <p>Not have an account? </p>
                    <Link className="authForm_link_link" to="/signup">
                      Create an account
                    </Link>
                  </div>

                  {/* <!-- Register buttons --> */}
                  <div className="text-center d-flex align-items-center justify-content-center">
                    <p className="mb-0">or continue with:</p>
                    <GoogleAuthBtn />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0">
            <img
              src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
              className="rounded-4 shadow-4 login_image"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;

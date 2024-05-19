import { useContext, useState } from "react";
import "../loginForm/loginForm.scss";
import { Link, useNavigate } from "react-router-dom";
import { validate } from "email-validator";
import { AuthContext } from "../../context/AuthContext";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../config/firebase";
import GoogleAuthBtn from "../googleAuthBtn/GoogleAuthBtn";
import addUser from "../../utils/addUser";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setCpassword("");
  };

  const signUp = async () => {
    setIsLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successfully created the user
        const user = userCredential.user;

        // Update user profile with display name
        return updateProfile(user, {
          displayName: name,
        })
          .then(async () => {
            // Dispatch user information and perform other actions as needed
            dispatch({ type: "LOGIN", payload: user });
            console.log("User ", user);
            await addUser(user);
            resetForm();
            setIsLoading(false);
            navigate("/");
          })
          .catch((profileError) => {
            // Handle profile update error

            console.error("Error updating profile:", profileError);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;

        if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
          alert("This email is already registered.");
        } else {
          // Handle other sign-up errors
          alert("Error signing up:", error);
          console.error("Error signing up:", error);
        }

        setIsLoading(false);
      });
  };

  const handleSignUp = () => {
    if (!validate(email.trim())) {
      alert("Invalid email");
      return;
    }

    if (password.trim().length < 8) {
      alert("Password should be atleast 8 digits");
      return;
    }

    if (password.trim() !== cPassword.trim()) {
      alert("Password not match");
      return;
    }

    signUp();
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
                <h2 className="fw-bold mb-5">Sign up now</h2>
                <div>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="text"
                      id="form3Example3"
                      className="form-control"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

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
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm password"
                      value={cPassword}
                      onChange={(e) => setCpassword(e.target.value)}
                    />
                  </div>

                  {/* <!-- Submit button --> */}
                  <button
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-primary btn-block mb-4"
                    onClick={handleSignUp}
                  >
                    Sign up
                  </button>

                  <div className="authForm_link">
                    <p>Already have an account? </p>
                    <Link className="authForm_link_link" to="/login">
                      Login
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

export default SignupForm;

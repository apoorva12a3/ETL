import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  //login-variable,setlogin-function
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const [loginMessage, setLoginMessage] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();//prevents the default form submission (auto refresh)


    // Validations for username
    if (!login.username) {
      setLoginMessage("Please enter a username");
      return;
    }
    if (login.username.length < 5) {
      setLoginMessage("Username must be at least 5 characters long");
      return;
    }
    // check non-word character
    if (/\W/.test(login.username)) {
      setLoginMessage("Username should not contain special characters");
      return;
    }


    // Validations for password
    if (!login.password) {
      setLoginMessage("Please enter a password");
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(login.password)) {
      setLoginMessage(
        "Password must be 8 characters long, contain '@', and at least 1 number."
      );
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/authenticate", {
        username: login.username,
        password: login.password,
      });

      if (response.data.token) {
        // Successful authentication; store the token securely in sessionStorage
        const newToken = response.data.token;
        sessionStorage.setItem("jwtToken", newToken); // Store the token in sessionStorage
        setLoginStatus(true);
      } else {
        setLoginMessage("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      window.alert("An error occurred during login");
      setLoginMessage("An error occurred during login");
    }
  };

  if (loginStatus === true) {
    navigate("navbar/home");
  }

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        className="row m-0 p-0"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "85%",
        }}
      />
      <div className="col-md-6 mt-5 bg-white p-5">
        <h3 className="pb-3 text-black">Login Form</h3>
        <br />
        <div className="form-style">
          <form onSubmit={handleLogin}>
            <div className="form-group pb-3">
              <input
                type="text"
                placeholder="Username"
                className="form-control"
                name="username"
                value={login.username}
                onChange={(e) =>
                  setLogin({ ...login, username: e.target.value })
                }
              />
            </div>
            <div className="form-group pb-3">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                name="password"
                value={login.password}
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
              />
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center"></div>
            </div>
            <div className="pb-2">
              <button
                type="submit"
                className="btn btn-dark w-100 font-weight-bold mt-2"
              >
                Submit
              </button>
              <p className="text-center" style={{ color: "red" }}>
                {loginMessage}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
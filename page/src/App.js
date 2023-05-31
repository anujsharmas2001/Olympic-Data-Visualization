import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);

    // Fetch loginData using Axios or Fetch
    axios
      .get(`http://localhost:9090/customers?email=${loginData.email}`)
      .then((response) => {
        console.log("Login Success:", response.data);

        // Perform data validation here
        const { email, password } = loginData;
        const users = response.data;

        // Check if the email exists
        const user = users.find((user) => user.email === email);
        if (user) {
          // If email exists, check if the entered password matches the stored password
          if (user.password === password) {
            // If email and password match the entered values, display a success message
            toast.success("Login successful.", {
              position: "top-right",
              autoClose: 900,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            // Redirect to another page or perform any other action
            setTimeout(() => {
              window.location.href = "http://localhost:8501/";
              // Clear the loginData state
              setLoginData({ email: "", password: "" });
            }, 1000);
            // Clear the loginData state
            setLoginData({ email: "", password: "" });
          } else {
            // If the entered password does not match the stored password, display an error message
            toast.error("Invalid password.", {
              position: "top-right",
              autoClose: 900,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        } else {
          // If the email does not exist, display an error message
          toast.error("Email does not exist.", {
            position: "top-right",
            autoClose: 900,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        console.error("Login Error:", error);
        // Handle login error
      });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", signupData);

    // Check if the email already exists before submitting the signupData
    axios
      .get(`http://localhost:9090/customers?email=${signupData.email}`)
      .then((response) => {
        const users = response.data;
        const existingUser = users.find((user) => user.email === signupData.email);
        if (existingUser) {
          // If the email already exists, display an error message
          toast.error("Email already exists.", {
            position: "top-right",
            autoClose: 900,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          // If the email does not exist, proceed with signup
          axios
            .post("http://localhost:9090/customers", signupData)
            .then((response) => {
              console.log("Signup Success:", response.data);
              // Display a success message
              toast.success("Signup successful.", {
                position: "top-right",
                autoClose: 900,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              // Handle signup success
              setSignupData({ name: "", email: "", password: "" }); // Clear the signupData state
            })
            .catch((error) => {
              console.error("Signup Error:", error);
              // Handle signup error
            });
        }
      })
      .catch((error) => {
        console.error("Error checking email existence:", error);
        // Handle error while checking email existence
      });
  };

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={900}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
   
      <div className="auth-container">
        <div className="text">
          <p>Welcome to Sports World!</p>
        </div>
        <div className="tabs">
          <button
            className={"login"}
            onClick={() => handleTabChange("login")}
          >
            Login
          </button>

          <button
            className={"login"}
            onClick={() => handleTabChange("signup")}
          >
            Signup
          </button>
        </div>
        <div className="card">
          {activeTab === "login" && (
            <form className="auth-form" onSubmit={handleLoginSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
                className="textbox"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
                className="textbox"
              />
              <button type="submit" className="login-button">
                Login
                
              </button>
            </form>
          )}
          {activeTab === "signup" && (
            <form className="auth-form" onSubmit={handleSignupSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={signupData.name}
                onChange={handleSignupChange}
                required
                className="textbox"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={signupData.email}
                onChange={handleSignupChange}
                required
                className="textbox"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={signupData.password}
                onChange={handleSignupChange}
                required
                className="textbox"
              />
              <button type="submit" className="signup-button">
                Signup
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

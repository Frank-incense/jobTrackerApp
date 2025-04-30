import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { users } from "./Register";
import { useState } from "react"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  
  function handleSubmit(e) {
    e.preventDefault();
  
    fetch(`${users}?email=${formData.email}&password=${formData.password}`)
      .then((r) => r.json())
      .then((data) => {
        if (data[0].email === formData.email) {
          setIsAuth(!isAuth);
          sessionStorage.setItem("userId", data[0].id);
          navigate("/job-listing");
        }
        else{
          alert("Invalid email or password");
        }
      });
  }

  return (
    <main>
      <header>
        <h1>Login to the Job Tracker App</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="formElement">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="formElement">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        <p>
          Don't have an Account?
          <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from '../style/LR.module.css'; // optional, your CSS module

function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }

      const result = await response.json();
      alert(result.message);

      // Save token (you can use localStorage or context)
      localStorage.setItem("token", result.token);
      localStorage.setItem("username", result.username);
      localStorage.setItem("role", result.role);

      // Redirect to dashboard or home page
      navigate("/quiz"); // change route as needed
    } catch (error) {
      console.error("Login error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.leftSide}></div>
      <div className={style.mid}>
        <div>
          <button className={style.sign}><a href="/register">Sign Up</a></button>
          <button className={style.log}><a href="/login">Log in</a></button>
        </div>
      </div>
      <div className={style.rightSide}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className={style.registerForm}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={data.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Log In</button>
        </form>
        <p className={style.registerText}>
          Don't have an account? <a href="/register">&nbsp;Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;

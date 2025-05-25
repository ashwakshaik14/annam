import { useState } from "react";
import style from '../style/LR.module.css';
import { useNavigate } from "react-router-dom";

function Register() {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        ConfirmPassword: "", // ✅ ADD THIS
        role: "user",
        passnumber: "",
      });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.ConfirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error.message);
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
        <p>Join us Today!</p>
        <form onSubmit={handleSubmit} className={style.registerForm}>
          <input type="text" name="username" placeholder="Username" value={data.username} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={data.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={data.password} onChange={handleChange} />
          <input type="password" name="ConfirmPassword" placeholder="Confirm Password" value={data.ConfirmPassword} onChange={handleChange} />

          {/* ✅ Role Selection */}
          <select name="role" value={data.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {/* ✅ Passnumber input if admin */}
          {data.role === "admin" && (
            <input
              type="password"
              name="passnumber"
              placeholder="Admin Passnumber"
              value={data.passnumber}
              onChange={handleChange}
            />
          )}

          <button type="submit">Register</button>
        </form>
        <p className={style.registerText}>
          Already have an account? <a href="/login">&nbsp;Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;

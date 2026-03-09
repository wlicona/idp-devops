import { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {

    e.preventDefault();

    await register(username, email, password);

    navigate("/login");
  };

  return (
    <div>

      <h2>Register</h2>

      <form onSubmit={handleRegister}>

        <input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Register</button>

      </form>

    </div>
  );
}
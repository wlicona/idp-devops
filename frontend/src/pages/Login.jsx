import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../context/AuthContext";

export default function Login() {

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:8000/auth/login",
        form
      );

      login(response.data.access_token);

      localStorage.setItem("token", response.data.access_token);

      // 🔥 REDIRECCIÓN
      navigate("/dashboard");

    } catch (error) {

      alert("Login failed");

    }

  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-900">

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg w-96"
      >

        <h2 className="text-white text-2xl mb-6">
          Login
        </h2>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded"
        />

        <button
          className="w-full bg-blue-600 p-3 rounded hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Don't have a account? {" "}

          <Link to="/register" className=" text-blue-400 hover:underline">Register</Link>
        </p>

      </form>

    </div>

  );

}
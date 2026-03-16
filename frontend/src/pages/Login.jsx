import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../context/AuthContext";

export default function Login() {

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:8000/auth/login",
        {email, password}
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

    <div className="flex h-screen">
      {/* Lado izquierdo */}

      <div className="w-1/2 bg-blue-700 text-white flex flex-col justify-center items-center p-10">

        <img src="/devops.png" className="w-92 mb-6" alt="DevOps Platform" />

        <h1 className=" text-4xl font-bold mb-4"> DevOps Self Service Platform</h1>

        <p className="text-lg text-center">
          Create repositories, manage projects and automate your
          DevOps workflow from a single platform.
        </p>

      </div>

      {/* Lado Derecho */}

      <div className="w-1/2 flex justify-center items-center bg-gray-900">

        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl w-96 space-y-4">

          <h2 className="text-2xl text-white font-bold">Login</h2>

          <input placeholder="Email" 
            className="w-full p-3 rounded bg-gray-700 text-white" 
            onChange={(e) => setEmail(e.target.value)} 
          />

          <input type="password" 
            placeholder="Password" 
            className="w-full p-3 rounded bg-gray-700 text-white" 
            onChange={(e) => setPassword(e.target.value)} 
          />

          <button className="w-full bg-blue-600 p-3 rounded hover:bg-blue-700">Login</button>

          {/* Registration Link*/}

          <p className="text-gray-400 text-sm text-center">
            Don't have an account?

            <Link to="/register" className="text-blue-400 ml-2 hover:underline">Create one</Link>
          </p>
        </form>
      
      </div>
    </div>

  );

}
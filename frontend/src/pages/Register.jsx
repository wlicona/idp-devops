import { useState } from "react";
import axios from "axios";

export default function Register() {

  const [form, setForm] = useState({
    name: "",
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
      await axios.post("http://localhost:8000/users/", form);
      alert("Usuario creado!");
    } catch (error) {
      console.error(error);
      alert("Error registrando usuario");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">

      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          DevOps IDP Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded text-white font-semibold"
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
}
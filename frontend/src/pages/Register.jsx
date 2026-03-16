import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

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


      await axios.post("http://localhost:8000/auth/register", {

        name: form.name,
        email: form.email,
        password: form.password

      });
      alert("Usuario creado!");
      
      navigate("/login")
    } catch (error) {

      console.log(error);
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
            name="name"
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
            /*value={form.password}*/
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded text-white font-semibold text-center"
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
}
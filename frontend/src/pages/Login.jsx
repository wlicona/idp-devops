import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import AuthLayout from "../components/AuthLayout"

export default function Login() {

  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <AuthLayout>

      <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Iniciar sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="usuario@email.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Contraseña
            </label>

            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Ingresar
          </button>

        </form>

        <p className="text-sm text-center mt-6">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-indigo-600 font-medium">
            Crear cuenta
          </a>
        </p>

      </div>

    </AuthLayout>
  )
}
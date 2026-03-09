import { useContext, useState } from "react";
import { login as loginAPI} from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();

        const data = await loginAPI(username, password);

        login(data.access_token);

        navigate("/dashboard");
    };

    return (
    <div>

      <h2>Login</h2>

      <form onSubmit={handleLogin}>

        <input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Login</button>

      </form>

    </div>
  );
}
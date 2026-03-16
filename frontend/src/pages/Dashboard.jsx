import { Link, useNavigate} from "react-router-dom"

export default function Dashboard(){

  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">

      {/* SIDEBAR*/ }

      <div className="w-64 bg-gray-800 p-6">

        <h1 className="text-xl font-bold mb-8">DevOps IDP</h1>

        <nav className="space-y-4">

          <button className="black text-left w-full hover:text-blue-400">
            Dashboard
          </button>

          <button className="black text-left w-full hover:text-blue-400">
            <Link to= "/create-organization">Organizations</Link>
          </button>

          <button className="black text-left w-full hover:text-blue-400">
            Pipelines
          </button>

          <button className="black text-left w-full hover:text-blue-400">
            Projects
          </button>

          <button className="black text-left w-full hover:text-blue-400">
            <Link to= "/create-project">Repositories</Link>
          </button>

          
        </nav>
      </div>

      {/* MAIN */}

      <div className="flex-1 p-10">

        <h2 className="text-3xl font-bold mb-6">Welcome to DevOps IDP</h2>

        <button onClick={() => navigate("/create-project")} className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg">
          Create Repository
        </button>

      </div>

    </div>
  )
}
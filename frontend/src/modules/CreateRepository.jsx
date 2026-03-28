import { useEffect, useState } from "react";
import axios from "axios";

export default function CreateRepository() {
    const [repository, setRepository] = useState({
        name: "",
        description: "",
        provider: "github",
        project_id: ""
    });

    const [projects, setProjects] = useState([]);

    useEffect(() => {

      const fetchProjects = async () => {
        
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:8000/api/projects", {

          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProjects(res.data);
      };

      fetchProjects();
    }, []);

    const handleChange = (e) => {
        setRepository({
            ...repository,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            await axios.post("http://localhost:8000/repos/repositories", repository, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Repository created successfully!");
            setRepository({
                name: "",
                description: "",
                provider: "github",
                project_id: ""
            });
        } catch (error) {
            console.error("Error creating repository:", error);
        }
    };

    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-900">

      <div className="bg-gray-800 p-8 rounded-xl w-96">

        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Create Repository
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Repository Name"
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 text-white"
          />

          <input
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 text-white"
          />

          <select
            name="provider"
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 text-white">

            <option value="github">GitHub</option>
            <option value="gitlab">GitLab</option>
            

            </select>

          <button
            className="w-full bg-blue-600 p-3 rounded hover:bg-blue-700 text-white text-center"
          >
            Create Repository
          </button>

        </form>

      </div>

    </div>

  );
    
}

import { useState } from "react";
import axios from "axios";

export default function CreateProject() {
    const [project, setProject] = useState({
        name: "",
        description: ""
    });

    const handleChange = (e) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:8000/github/create-repo",
                null,
                {
                    params: {
                        name: project.name,
                        description: project.description
                    }
                        
                }
            );

            alert("Repository Created");
        } catch (error) {
            console.error(error);
            alert("Error creating repository");
        }
    };

    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-900">

      <div className="bg-gray-800 p-8 rounded-xl w-96">

        <h2 className="text-2xl font-bold mb-6 text-white">
          Create Project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Project Name"
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 text-white"
          />

          <input
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 text-white"
          />

          <button
            className="w-full bg-blue-600 p-3 rounded hover:bg-blue-700"
          >
            Create Repository
          </button>

        </form>

      </div>

    </div>

  );
    
}
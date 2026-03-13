import { useState } from "react";
import axios from "axios";

export default function CreateProject() {
    const [project, setProject] = useState({
        name: "",
        description: "",
        provider: "github"
    });

    const handleChange = (e) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(project)
    
    const token = localStorage.getItem("token"); 

    if (!token) {
      alert("Login Required");

      return;
    }
        try {
            await axios.post(
                "http://localhost:8000/repos/repositories", project,
                
                {
                       
                  headers: {
                  Authorization: `Bearer ${token}`
                        
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
            className="w-full bg-blue-600 p-3 rounded hover:bg-blue-700"
          >
            Create Repository
          </button>

        </form>

      </div>

    </div>

  );
    
}
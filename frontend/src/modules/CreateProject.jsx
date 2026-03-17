import { useState, useEffect } from "react";
import axios from "axios";

export default function CreateProject() {
    const [name, setName] = useState("");
    const [organizations, setOrganizations] = useState([]);
    const [organizationId, setOrganizationId] = useState("");

    useEffect(() => {

        const fetchOrganizations = async () => {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:8000/organizations",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

          /* console.log("ORGS:", res.data);*/

           setOrganizations(res.data.organizations || res.data);
        };

        fetchOrganizations();
    }, []);

    const createProject = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        await axios.post(
            "http://localhost:8000/projects", {
                name: name,
                organization_id: organizationId
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert("Project Created");
    };

    return(

        <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-xl w-96">

            <h2 className="text-2xl font-bold mb-6 text-center">Create Project</h2>

            <form onSubmit={createProject} className="space-y-4">

                <input 
                  placeholder="Project Name" 
                  className="w-full p-3 rounded bg-gray-700" 
                  onChange={(e) => setName(e.target.value)} 
                />

                <select
                   className="w-full p-3 rounded bg-gray-700"
                   onChange={(e) => setOrganizationId(e.target.value)}
                 >

                    <option>Select Organization</option>

                    {organizations.map((org) => (
                        <option key={org.id} value={org.id}>
                            {org.name}
                        </option>
                            
                       
                    ))}

                </select>

                <button className="w-full bg-blue-600 p-3 rounded hover:bg-blue-700">
                    Create Project
                </button>

            </form>
        </div>
       </div> 
    );
}
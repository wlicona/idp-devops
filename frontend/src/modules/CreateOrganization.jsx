import { useState } from "react";
import axios from "axios";

export default function CreateOrganization() {
    const [name, setName] = useState("");

    const createOrg = async (e) => {
        e.preventDefault();


        const token = localStorage.getItem("token");

        if (!token) {
            alert("Login Required!");

            return;
        }

            await axios.post(
               "http://localhost:8000/organizations",
               { name },

               {
                headers: {
                    Authorization: `Bearer ${token}`
                 }
               } 
            );

            alert("Organization Created");

    };

           
    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-xl w-96">
                <h2 className="text-2xl font-bold mb-6 text-white text-center">
                    Create Organization
                </h2>

                <form onSubmit={createOrg} className="space-y-4">
                    <input 
                        name="name"
                        placeholder="Organization Name"
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 rounded bg-gray-700 text-white"
                    />

                    <button className="w-full bg-blue-600 p-3 rounded hover:bg-blue-700 text-white">
                        Create Organization
                    </button>

                </form>
            </div>
        </div>
    );
}
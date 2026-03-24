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

        <div className="flex justify-center items-center min-h-screen bg-gray-900">

        <div className="bg-gray-800 p-8 rounded-xl w-96">

            <h2 className="text-2xl font-bold mb-6 text-center">
                Create Organization
            </h2>

      <form
        onSubmit={createOrg}
        className="bg-gray-800 p-6 rounded-xl space-y-4 shadow"
      >

        <input
          placeholder="Organization Name"
          className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setName(e.target.value)}
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold">
          Create Organization
        </button>

      </form>

        </div>
      
    </div>
    );
}
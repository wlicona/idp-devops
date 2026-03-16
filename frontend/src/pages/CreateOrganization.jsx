import { useState } from "react";
import axios from "axios";

export default function CreateOrganization() {
    const [organization, setOrganization] = useState({
        name: ""
    });

    const handleChange = (e) => {
        setOrganization({
            ...organization,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(organization)

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Login Required!");

            return;
        }

        try {
            await axios.post(
               "http://localhost:8000/organizations", organization,
               {
                headers: {
                    Authorization: `Bearer ${token}`
                 }
               } 
            );

            alert("Organization Created");
        } catch(error){
            console.error(error);
            alert("Error creating Organization");
        }
    };

    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-xl w-96">
                <h2 className="text-2xl font-bold mb-6 text-white text-center">
                    Create Organization
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        name="name"
                        placeholder="Organization Name"
                        onChange={handleChange}
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
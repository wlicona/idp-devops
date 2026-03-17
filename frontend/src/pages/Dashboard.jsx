import { useState, useEffect } from "react";
import { Building2, FolderKanban, GitBranch } from "lucide-react";
import axios from "axios";

import Sidebar from "../components/sidebar";
import CreateOrganization from "../modules/CreateOrganization";
import CreateRepository from "../modules/CreateRepository";
import CreateProject from "../modules/CreateProject";

export default function Dasboard() {

  const [view, setView] = useState("dashboard");
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {

    if (view === "dashboard"){
      const fetchMetrics = async () => {
        const token = localStorage.getItem("token");

        try {

          const res = await axios.get(
            
            "http://localhost:8000/dashboard/metrics",
            {
              headers: {
                  Authorization: `Bearer ${token}`
              }
            }
          );

          setMetrics(res.data);

        } catch(error) {
          console.error(error);
        }
        
      };

      fetchMetrics();
    }
  }, [view]);

  const renderView = () => {
    
    if (view === "organization") return <CreateOrganization />;
    if (view === "project") return <CreateProject />;
    if (view === "repositories") return <CreateRepository />;

    if (!metrics){
      return <p className="text-white">Loading Metrics...</p>;
    }
    return (

      <div className="space-y-8">

        {/* 🔢 CARDS */}
        <div className="grid grid-cols-3 gap-6">

        {/*Organizations*/}

          <div className="bg-gray-800 p-6 rounded-xl shadow flex items-center justify-between hover:scale-105 transition transform duration-200">

            <div>
            <h3 className="text-gray-400 text-center">Organizations</h3>
            <p className="text-3xl font-bold items-center">
              {metrics.organizations}
            </p>
          </div>

          <div className="bg-blue-600 p-3 rounded-lg">
            <Building2 size={24} />
          </div>  

          </div>

          {/*Projects*/}

          <div className="bg-gray-800 p-6 rounded-xl shadow flex items-center justify-between hover:scale-105 transition transform duration-200">
            <div>
              <h3 className="text-gray-400">Projects</h3>
              <p className="text-3xl font-bold">
                {metrics.projects}
              </p>
            </div>

            <div className="bg-green-600 p-3 rounded-lg">
              <FolderKanban size={24} />

            </div>
          </div>

          {/* Repositories */}
          <div className="bg-gray-800 p-6 rounded-xl shadow flex items-center justify-between hover:scale-105 transition transform duration-200">

            <div>
              <h3 className="text-gray-400">Repositories</h3>
              <p className="text-3xl font-bold">
                {metrics.repositories}
              </p>
          </div>

          <div className="bg-purple-600 p-3 rounded-lg">
            <GitBranch size={24} />
          </div>
        </div>  
      </div>
        
        
    </div>
    );
  };
  
  return (

    <div className="flex bg-gray-950 text-white">

      <Sidebar setView={setView} />

      <div className="flex-1 p-10">

        {renderView()}

      </div>

    </div>

  );

}
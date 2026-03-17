import { useState } from "react";

import Sidebar from "../components/sidebar";
import CreateOrganization from "../modules/CreateOrganization";
import CreateRepository from "../modules/CreateRepository";
import CreateProject from "../modules/CreateProject";

export default function Dasboard() {

  const [view, setView] = useState("dashboard");

  const renderView = () => {
    
    if (view === "organization") return <CreateOrganization />;
    if (view === "project") return <CreateProject />;
    if (view === "repositories") return <CreateRepository />;

    return (

      
       <div className="grid grid-cols-3 gap-6">

        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-gray-400">Organizations</h3>
          <p className="text-3xl font-bold">2</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-gray-400">Projects</h3>
          <p className="text-3xl font-bold">4</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-gray-400">Repositories</h3>
          <p className="text-3xl font-bold">2</p>
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
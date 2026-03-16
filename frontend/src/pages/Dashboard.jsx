import { useState } from "react";

import Sidebar from "../components/sidebar";
import CreateOrganization from "../modules/CreateOrganization";
import CreateProject from "../modules/CreateProject";

export default function Dasboard() {

  const [view, setView] = useState("dashboard");

  const renderView = () => {
    
    if (view === "organization") return <CreateOrganization />;  
    if (view === "repositories") return <CreateProject />;

    return <h1 className="text-3xl text-white">Welcome to DevOps Portal</h1>
  };
  
  return (

    <div className="flex">

      <Sidebar setView={setView} />

      <div className="flex-1 bg-gray-800 p-10 min-h-screen">

        {renderView()}

      </div>

    </div>

  );

}
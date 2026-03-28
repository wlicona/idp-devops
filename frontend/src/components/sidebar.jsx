import { FolderPlus, Building2, LayoutDashboard, GitBranch, LogOut } from "lucide-react";

export default function Sidebar({ setView}) {
    return (
        <div className="w-64 bg-gray-900 text-gray-200 h-screen p-6 flex flex-col justify-between border-r border-gray-800">

          <div>
            <h1 className="text-2xl font-bold mb-10 text-white">
                DevOps Portal
            </h1>

            <nav className="space-y-3">

                <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-800 transition" onClick={() => setView("dashboard")}>
                    <LayoutDashboard size={18} />
                    Dashboard
                </button>

                <button 
                  onClick={() => setView("organization")}
                  className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-800 transition">

                  <Building2 size={18} />
                  Organizations
                  </button>

                <button 
                  onClick={() => setView("project")}
                  className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-800 transition">
                  
                  <FolderPlus size={18} />
                  Projects
                </button>

                <button 
                  onClick={() => setView("pipelines")}
                  className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-800 transition">
                  
                  <FolderPlus size={18} />
                  Pipelines
                </button>

                <button 
                  onClick={() => setView("repositories")}
                  className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-800 transition">
                  
                  <GitBranch size={18} />
                  Repositories
                </button>

                <button onClick={() => setView("list_repositories")}
                  
                  className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-800 transition">
                  
                  <GitBranch size={18} />
                  View Repositories
                </button>

            </nav>
        </div>
        
        {/* 🔴 LOGOUT */}
          <button
            onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
            }}
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-600 transition"
          >
            <LogOut size={18}/>
            Logout
          </button>
      </div> 
              

                
    );
}
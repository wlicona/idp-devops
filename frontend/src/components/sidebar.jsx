export default function Sidebar({ setView}) {
    return (
        <div className="w-64 bg-gray-900 text-white h-screen p-6">
            <h1 className="text-xl font-bold mb-8">
                DevOps Portal
            </h1>

            <ul className="space-y-4">

                <li>
                    <button onClick={() => setView("dasboard")}>
                        Dashboard
                    </button>
                </li>

                <li>
                    <button onClick={() => setView("organization")}>
                        Organizations
                    </button>
                </li>

                <li>
                    <button onClick={() => setView("pipelines")}>
                        Pipelines
                    </button>
                </li>

                <li>
                    <button onClick={() => setView("projects")}>
                        Projects
                    </button>
                </li>

                <li>
                    <button onClick={() => setView("repositories")}>
                        Repositories
                    </button>
                </li>
            </ul>
        </div>
    );
}
import { useEffect, useState } from "react";
import axios from "axios";

export default function RepositoryList() {

    const [repos, repositories] = useState([]);

    useEffect(() => {

        const fetchRepositories = async () => {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:8000/repos/repositories", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            repositories(res.data);
        };

        fetchRepositories();
    }, []);

    return (

    <div className="bg-gray-800 p-6 rounded-xl">

      <h2 className="text-xl font-bold mb-4">
        Repositories
      </h2>

      <table className="w-full text-left">

        <thead>
          <tr className="border-b border-gray-700 text-gray-400">
            <th>Name</th>
            <th>Provider</th>
            <th>URL</th>
            <th>Branch</th>
          </tr>
        </thead>

        <tbody>

          {repos.map((repo) => (

            <tr key={repo.id} className="border-b border-gray-700">

              <td className="py-2">{repo.name}</td>

              <td className="capitalize">{repo.provider}</td>

              <td>
                <a
                  href={repo.repo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  View Repo
                </a>
              </td>

              <td>{repo.default_branch}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
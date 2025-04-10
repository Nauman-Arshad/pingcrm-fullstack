import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCompanies, deleteCompany } from "../services/companies";
import { Company } from "../types";

export default function CompanyList() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanies = () => {
    getCompanies()
      .then(res => setCompanies(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this company?")) {
      await deleteCompany(id);
      fetchCompanies();
    }
  };

  if (loading) return <p className="text-gray-500">Loading companies...</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Company List</h2>
        <Link
          to="/companies/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Company
        </Link>
      </div>

      {companies.length === 0 ? (
        <p className="text-gray-600">No companies found.</p>
      ) : (
        <ul className="space-y-2">
          {companies.map(company => (
            <li
              key={company.id}
              className="border p-3 rounded shadow-sm flex justify-between items-center"
            >
              <div>
                <div className="font-medium">{company.name}</div>
                <div className="text-sm text-gray-600">{company.city}</div>
              </div>
              <div className="space-x-3">
                <Link
                  to={`/companies/${company.id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(company.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
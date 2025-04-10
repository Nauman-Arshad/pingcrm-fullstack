import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getContacts, deleteContact } from "../services/contacts";
import { getCompanies } from "../services/companies";
import { Contact, Company } from "../types";

export default function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState<number | "">("");
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    setLoading(true);
    const res = await getContacts({
      search: search || undefined,
      company_id: companyFilter !== "" ? Number(companyFilter) : undefined,
    });
    setContacts(res.data);
    setLoading(false);
  };

  const fetchCompanies = async () => {
    const res = await getCompanies();
    setCompanies(res.data);
  };

  useEffect(() => {
    fetchCompanies();
    fetchContacts();
  }, []);

  const getCompanyName = (id: number) => companies.find(c => c.id === id)?.name || "Unknown";

  const handleDelete = async (id: number) => {
    if (confirm("Delete this contact?")) {
      await deleteContact(id);
      fetchContacts();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setCompanyFilter(e.target.value === "" ? "" : Number(e.target.value));

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchContacts();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Contact List</h2>
        <Link to="/contacts/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + New Contact
        </Link>
      </div>

      <form
        onSubmit={handleFilterSubmit}
            className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center bg-white p-4 rounded shadow mb-6"
            >
            <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="🔍 Search by name"
                className="col-span-2 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
                value={companyFilter}
                onChange={handleCompanyChange}
                className="col-span-2 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">🏢 All Companies</option>
                {companies.map(c => (
                <option key={c.id} value={c.id}>
                    {c.name}
                </option>
                ))}
            </select>

            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition-colors"
            >
                Filter
            </button>
        </form>


      {loading ? (
        <p className="text-gray-500">Loading contacts...</p>
      ) : contacts.length === 0 ? (
        <p className="text-gray-600">No contacts found.</p>
      ) : (
        <ul className="space-y-2">
          {contacts.map(contact => (
            <li key={contact.id} className="border p-3 rounded shadow-sm flex justify-between">
              <div>
                <div className="font-medium">{contact.name} ({contact.phone})</div>
                <div className="text-sm text-gray-600">
                  {contact.city} — {getCompanyName(contact.company_id)}
                </div>
              </div>
              <div className="space-x-2">
                <Link to={`/contacts/${contact.id}/edit`} className="text-blue-600 hover:underline">
                  Edit
                </Link>
                <button onClick={() => handleDelete(contact.id)} className="text-red-500 hover:underline">
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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContactCreate, Company } from "../types";
import { getCompanies } from "../services/companies";
import { createContact, getContact, updateContact } from "../services/contacts";

export default function ContactForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState<ContactCreate>({
    name: "",
    phone: "",
    city: "",
    company_id: 0,
  });
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const companyRes = await getCompanies();
      setCompanies(companyRes.data);

      if (isEdit) {
        const contactRes = await getContact(Number(id));
        setForm(contactRes.data);
      }

      setLoading(false);
    };

    fetchAll();
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === "company_id" ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      await updateContact(Number(id), form);
    } else {
      await createContact(form);
    }
    navigate("/contacts");
  };

  if (loading) return <p className="p-4 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">{isEdit ? "Edit" : "Create"} Contact</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border px-3 py-2 rounded" required />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full border px-3 py-2 rounded" required />
        <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="w-full border px-3 py-2 rounded" required />

        <select name="company_id" value={form.company_id} onChange={handleChange} className="w-full border px-3 py-2 rounded" required>
          <option value="" disabled>Select Company</option>
          {companies.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {isEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
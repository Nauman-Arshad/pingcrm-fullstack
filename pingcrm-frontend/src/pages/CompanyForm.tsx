import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCompany, getCompany, updateCompany } from "../services/companies";
import { CompanyCreate } from "../types";

export default function CompanyForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState<CompanyCreate>({ name: "", city: "" });
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      getCompany(Number(id))
        .then(res => setForm({ name: res.data.name, city: res.data.city }))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      await updateCompany(Number(id), form);
    } else {
      await createCompany(form);
    }
    navigate("/companies");
  };

  if (loading) return <p className="p-4 text-gray-500">Loading company...</p>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">{isEdit ? "Edit" : "Create"} Company</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Company name"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
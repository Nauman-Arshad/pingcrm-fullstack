import api from "./api";
import { Company, CompanyCreate } from "../types";

export const getCompanies = () => api.get<Company[]>("/companies/");
export const getCompany = (id: number) => api.get<Company>(`/companies/${id}`);
export const createCompany = (data: CompanyCreate) => api.post<Company>("/companies/", data);
export const updateCompany = (id: number, data: CompanyCreate) => api.put<Company>(`/companies/${id}`, data);
export const deleteCompany = (id: number) => api.delete(`/companies/${id}`);

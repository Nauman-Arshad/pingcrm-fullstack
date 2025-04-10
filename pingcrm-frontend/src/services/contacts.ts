import api from "./api";
import { Contact, ContactCreate } from "../types";

export const getContacts = (params?: { search?: string; company_id?: number }) => {
  return api.get<Contact[]>("/contacts/", { params });
};

export const getContact = (id: number) => api.get<Contact>(`/contacts/${id}`);

export const createContact = (data: ContactCreate) =>
  api.post<Contact>("/contacts/", data);

export const updateContact = (id: number, data: ContactCreate) =>
  api.put<Contact>(`/contacts/${id}`, data);

export const deleteContact = (id: number) =>
  api.delete(`/contacts/${id}`);
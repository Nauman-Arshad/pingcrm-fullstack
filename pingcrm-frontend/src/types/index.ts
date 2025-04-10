export interface Company {
    id: number;
    name: string;
    city: string;
  }
  
  export interface CompanyCreate {
    name: string;
    city: string;
  }
  
  export interface Contact {
    id: number;
    name: string;
    phone: string;
    city: string;
    company_id: number;
    company?: Company;
  }
  
  export interface ContactCreate {
    name: string;
    phone: string;
    city: string;
    company_id: number;
  }
  
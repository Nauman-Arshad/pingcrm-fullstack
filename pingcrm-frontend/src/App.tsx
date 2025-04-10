import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import ContactList from './pages/ContactList';
import ContactForm from "./pages/ContactForm";
import CompanyList from "./pages/CompanyList";
import CompanyForm from "./pages/CompanyForm";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/contacts" />} />
            <Route path="/contacts" element={<ContactList />} />
            <Route path="/contacts/new" element={<ContactForm />} />
            <Route path="/contacts/:id/edit" element={<ContactForm />} />
            <Route path="/companies" element={<CompanyList />} />
            <Route path="/companies/new" element={<CompanyForm />} />
            <Route path="/companies/:id/edit" element={<CompanyForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

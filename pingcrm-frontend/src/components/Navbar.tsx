import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Contacts", path: "/contacts" },
  { name: "Companies", path: "/companies" },
];

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">PingCRM</h1>
        <div className="space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium ${
                location.pathname.startsWith(link.path)
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Users, Tag, BarChartBig } from "lucide-react";

export const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="w-64 bg-blue h-full flex flex-col">
      <div className="p-6">
        <h1 className="text-white text-xl font-semibold">
          Controle de Clientes Michel
        </h1>
      </div>
      <nav className="flex-1 px-4 py-2">
        <ul className="space-y-2">
          <li>
            <Link to="/" className={`sidebar-item ${isActive("/") ? "active" : ""}`}>
              <BarChartBig size={20} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/clients" className={`sidebar-item ${isActive("/clients") ? "active" : ""}`}>
              <Users size={20} />
              <span>Clientes</span>
            </Link>
          </li>
          <li>
            <Link to="/tags" className={`sidebar-item ${isActive("/tags") ? "active" : ""}`}>
              <Tag size={20} />
              <span>Tags</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 text-white/60 text-sm">
        <p>© 2025 Controle de Clientes Michel</p>
      </div>
    </aside>
  );
};

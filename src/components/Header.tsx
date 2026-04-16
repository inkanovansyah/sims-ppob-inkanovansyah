import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-slate-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/dashboard" className="flex items-center gap-2">
            <img src="/assets/Logo.png" alt="Logo" className="w-6 h-6 object-contain" />
            <span className="font-bold text-slate-900">SIMS PPOB</span>
          </NavLink>
          
          <nav className="flex items-center gap-8">
            <NavLink 
              to="/topup" 
              className={({ isActive }) => 
                `text-sm font-semibold transition-colors ${isActive ? 'text-[#f42619]' : 'text-slate-600 hover:text-[#f42619]'}`
              }
            >
              Top Up
            </NavLink>
            <NavLink 
              to="/transaction" 
              className={({ isActive }) => 
                `text-sm font-semibold transition-colors ${isActive ? 'text-[#f42619]' : 'text-slate-600 hover:text-[#f42619]'}`
              }
            >
              Transaction
            </NavLink>
            <NavLink 
              to="/profile" 
              className={({ isActive }) => 
                `text-sm font-semibold transition-colors ${isActive ? 'text-[#f42619]' : 'text-slate-600 hover:text-[#f42619]'}`
              }
            >
              Akun
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

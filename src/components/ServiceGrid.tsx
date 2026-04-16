import React from 'react';
import { useAppSelector } from '../hooks/useRedux';

const ServiceGrid: React.FC = () => {
  const { data: services, loading } = useAppSelector((state) => state.services);

  if (loading && services.length === 0) {
    return (
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-4 py-8">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 animate-pulse">
            <div className="w-12 h-12 bg-slate-100 rounded-lg"></div>
            <div className="w-16 h-3 bg-slate-100 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-x-2 gap-y-6 py-8">
      {services.map((service) => (
        <div 
          key={service.service_code}
          className="flex flex-col items-center text-center gap-2 group cursor-pointer transition-transform hover:-translate-y-1"
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-50 transition-colors group-hover:border-red-100 group-hover:bg-red-50/30 overflow-hidden p-0">
            <img 
              src={service.service_icon} 
              alt={service.service_name} 
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-[10px] font-medium text-slate-700 leading-tight">
            {service.service_name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ServiceGrid;

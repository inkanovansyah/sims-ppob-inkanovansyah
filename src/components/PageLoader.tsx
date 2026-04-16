import React from 'react';

// Komponen penampil saat halaman sedang dimuat (Lazy Loading Fallback)
const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="relative">
        {/* Spinner Utama */}
        <div className="w-16 h-16 border-4 border-slate-100 border-t-[#f42619] rounded-full animate-spin"></div>
        {/* Logo kecil di tengah spinner atau efek pulse */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-[#f42619] rounded-full animate-pulse"></div>
        </div>
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-400 animate-pulse">Memuat halaman...</p>
    </div>
  );
};

export default PageLoader;

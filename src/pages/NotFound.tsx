import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6">
        {/* Ilustrasi atau Icon 404 */}
        <div className="relative inline-block">
          <h1 className="text-9xl font-black text-slate-100 selection:bg-transparent">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-[#f42619] bg-white px-4">Halaman Tidak Ditemukan</span>
          </div>
        </div>
        
        <p className="text-slate-500 max-w-sm mx-auto">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan ke alamat lain.
        </p>

        <div className="pt-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3 bg-[#f42619] text-white font-bold rounded-md hover:bg-red-700 transition-all shadow-md hover:shadow-lg active:scale-95 text-sm"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 text-slate-300 text-[10px] font-medium tracking-widest uppercase">
        SIMS PPOB - Kristanto Wibowo
      </div>
    </div>
  );
};

export default NotFound;

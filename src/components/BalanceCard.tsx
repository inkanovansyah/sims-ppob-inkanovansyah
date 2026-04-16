import React, { useState } from 'react';
import { useAppSelector } from '../hooks/useRedux';

const BalanceCard: React.FC = () => {
  const [showBalance, setShowBalance] = useState(false);
  const { data: balanceData, loading } = useAppSelector((state) => state.balance);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount).replace('IDR', 'Rp');
  };

  return (
    <div className="relative w-full h-[180px] rounded-2xl overflow-hidden shadow-lg bg-[#f42619]">
      {/* Background Pattern */}
      <img 
        src="/assets/Background Saldo.png" 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-6 text-white z-10">
        <p className="text-sm font-medium opacity-90 mb-2">Saldo anda</p>
        <div className="flex flex-col gap-3">
          <h3 className="text-2xl font-bold tracking-wider">
            {loading ? (
              <span className="opacity-50">...</span>
            ) : showBalance ? (
              formatCurrency(balanceData?.balance || 0)
            ) : (
              'Rp ● ● ● ● ● ● ●'
            )}
          </h3>
          <button 
            onClick={() => setShowBalance(!showBalance)}
            className="w-fit text-[11px] font-medium flex items-center gap-1.5 hover:opacity-80 transition-opacity"
          >
            {showBalance ? 'Sembunyikan Saldo' : 'Lihat Saldo'}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showBalance ? "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" : "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"} />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;

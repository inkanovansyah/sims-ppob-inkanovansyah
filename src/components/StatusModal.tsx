import React from 'react';

interface StatusModalProps {
  isOpen: boolean;
  type: 'confirm' | 'success' | 'failure';
  amount: number;
  onConfirm?: () => void;
  onClose: () => void;
  isLoading?: boolean;
  title?: string;
  actionText?: string;
}

const StatusModal: React.FC<StatusModalProps> = ({ 
  isOpen, 
  type, 
  amount, 
  onConfirm, 
  onClose,
  isLoading,
  title,
  actionText
}) => {
  if (!isOpen) return null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val).replace('IDR', 'Rp');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl max-w-sm w-full p-8 flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Icon Area */}
        {type === 'confirm' && (
          <div className="w-16 h-16 bg-[#f42619] rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        )}

        {type === 'success' && (
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}

        {type === 'failure' && (
          <div className="w-16 h-16 bg-[#f42619] rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )}

        {/* Text Content */}
        <p className="text-slate-600 text-sm font-medium mb-1">
          {title || (type === 'confirm' ? 'Anda yakin untuk Top Up sebesar' : 'Top Up sebesar')}
        </p>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-1">
          {formatCurrency(amount)}
        </h2>

        <p className="text-slate-600 text-sm font-medium mb-8">
          {type === 'confirm' ? '?' : type === 'success' ? 'berhasil' : 'gagal'}
        </p>

        {/* Buttons */}
        <div className="w-full flex flex-col gap-3">
          {type === 'confirm' ? (
            <>
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className="w-full font-bold text-[#f42619] transition-opacity hover:opacity-80 py-2 disabled:opacity-50"
              >
                {isLoading ? 'Sedang diproses...' : (actionText || 'Ya, lanjutkan Top Up')}
              </button>
              <button
                onClick={onClose}
                disabled={isLoading}
                className="w-full font-bold text-slate-400 transition-opacity hover:opacity-80 py-2"
              >
                Batalkan
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full font-bold text-[#f42619] transition-opacity hover:opacity-80 py-2"
            >
              Kembali ke Beranda
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusModal;

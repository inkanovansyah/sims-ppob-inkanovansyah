import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import BalanceCard from '../components/BalanceCard';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchProfile } from '../store/slices/profileSlice';
import { fetchBalance } from '../store/slices/balanceSlice';
import { fetchHistory, resetHistory } from '../store/slices/transactionSlice';

const TransactionHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: profile } = useAppSelector((state) => state.profile);
  const { records, loading, offset, limit, hasMore } = useAppSelector((state) => state.transaction);
  const initialized = useRef(false);

  // Inisialisasi data saat halaman pertama kali dibuka
  useEffect(() => {
    // Gunakan ref 'initialized' untuk mencegah double fetch di React Strict Mode (Development)
    if (!initialized.current) {
      dispatch(fetchProfile());
      dispatch(resetHistory()); // Reset data lama sebelum mengambil yang baru
      dispatch(fetchHistory({ offset: 0, limit: 5 })); // Ambil 5 data pertama
      dispatch(fetchBalance());
      initialized.current = true;
    }
  }, [dispatch]);

  // Fungsi untuk mengambil data berikutnya ketika tombol "Show more" diklik
  const handleShowMore = () => {
    dispatch(fetchHistory({ offset, limit }));
  };

  // Helper untuk memformat angka menjadi format Rupiah (Rp) dan menambahkan tanda +/-
  const formatCurrency = (val: number, type: string) => {
    const formatted = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val).replace('IDR', 'Rp');
    
    return type === 'TOPUP' ? `+ ${formatted}` : `- ${formatted}`;
  };

  // Helper untuk memformat tanggal ke standar penulisan Indonesia (WIB)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return date.toLocaleDateString('id-ID', options) + ' WIB';
  };

  const welcomeName = profile ? `${profile.first_name} ${profile.last_name}` : '...';

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Profile & Balance Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start">
          <div className="lg:col-span-5 flex flex-col gap-4 mt-2">
            <div className="w-16 h-16 rounded-full overflow-hidden border border-slate-100 shadow-sm">
              <img 
                src={profile?.profile_image && !profile.profile_image.includes('null') ? profile.profile_image : '/assets/Profile Photo.png'} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <p className="text-lg text-slate-600">Selamat datang,</p>
              <h1 className="text-3xl font-bold text-slate-900 leading-tight">
                {welcomeName}
              </h1>
            </div>
          </div>
          <div className="lg:col-span-1" />
          <div className="lg:col-span-6">
            <BalanceCard />
          </div>
        </div>

        {/* Transaction History Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Semua Transaksi</h2>
          
          <div className="space-y-4">
            {records.map((record, index) => (
              <div 
                key={`${record.invoice_number}-${index}`}
                className="p-4 border border-slate-200 rounded-lg flex justify-between items-start transition-shadow hover:shadow-sm"
              >
                <div className="space-y-2">
                  <h3 className={`text-xl font-bold ${record.transaction_type === 'TOPUP' ? 'text-emerald-500' : 'text-[#f42619]'}`}>
                    {formatCurrency(record.total_amount, record.transaction_type)}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {formatDate(record.created_on)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-slate-700 font-medium">
                    {record.description}
                  </p>
                </div>
              </div>
            ))}

            {records.length === 0 && !loading && (
              <div className="py-20 text-center">
                <p className="text-slate-400 text-sm italic">Belum ada riwayat transaksi</p>
              </div>
            )}
          </div>

          {hasMore && (
            <div className="pt-6 text-center">
              <button
                onClick={handleShowMore}
                disabled={loading}
                className="text-[#f42619] font-bold text-sm hover:underline disabled:opacity-50"
              >
                {loading ? 'Memuat...' : 'Show more'}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TransactionHistory;

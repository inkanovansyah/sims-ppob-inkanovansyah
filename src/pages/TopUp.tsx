import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BalanceCard from '../components/BalanceCard';
import StatusModal from '../components/StatusModal';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchProfile } from '../store/slices/profileSlice';
import { fetchBalance, topUpBalance, clearBalanceError } from '../store/slices/balanceSlice';

const TopUp: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [modalType, setModalType] = useState<'confirm' | 'success' | 'failure' | null>(null);
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: profile } = useAppSelector((state) => state.profile);
  const { loading, error } = useAppSelector((state) => state.balance);

  const presets = [10000, 20000, 50000, 100000, 250000, 500000];
  
  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
  }, [dispatch]);

  const welcomeName = profile ? `${profile.first_name} ${profile.last_name}` : '...';
  
  // Logika Validasi: Minimal Rp10.000 dan Maksimal Rp1.000.000
  const numericAmount = parseInt(amount) || 0;
  const isValid = numericAmount >= 10000 && numericAmount <= 1000000;

  // Handler untuk mengelola perubahan input nominal
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Hapus semua karakter selain angka
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    setAmount(rawValue);
  };

  // Helper untuk memformat tampilan input dengan pemisah ribuan (titik)
  const formatDisplayAmount = (val: string) => {
    if (!val) return '';
    return new Intl.NumberFormat('id-ID').format(parseInt(val));
  };

  const handleTopUpClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      setModalType('confirm');
    }
  };

  const handleConfirmTopUp = async () => {
    dispatch(clearBalanceError());
    const resultAction = await dispatch(topUpBalance(numericAmount));
    if (topUpBalance.fulfilled.match(resultAction)) {
      setModalType('success');
    } else {
      setModalType('failure');
    }
  };

  const handleCloseModal = () => {
    if (modalType === 'success' || modalType === 'failure') {
      navigate('/dashboard');
    }
    setModalType(null);
  };

  const formatCurrencyLabel = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val).replace('IDR', 'Rp');
  };

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

        {/* Top Up Form Section */}
        <div className="max-w-full">
          <p className="text-slate-600 mb-1">Silahkan masukan</p>
          <h2 className="text-2xl font-bold text-slate-900 mb-10">Nominal Top Up</h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Col - Input & Action */}
            <form onSubmit={handleTopUpClick} className="lg:col-span-7 space-y-6">
              <div className="relative flex items-center border border-slate-300 rounded-md focus-within:border-[#f42619] transition-all bg-white overflow-hidden">
                <span className="pl-4 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={formatDisplayAmount(amount)}
                  onChange={handleAmountChange}
                  placeholder="masukan nominal Top Up"
                  className="w-full pl-3 pr-4 py-3 focus:outline-none text-slate-700 placeholder:text-slate-300 text-sm font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={!isValid || loading}
                className={`w-full font-bold py-3 rounded-md transition-all text-sm h-12 flex items-center justify-center ${
                  isValid && !loading
                    ? 'bg-[#f42619] hover:bg-red-700 text-white shadow-md'
                    : 'bg-slate-300 text-slate-400 cursor-not-allowed'
                }`}
              >
                Top Up
              </button>
            </form>

            {/* Right Col - Presets */}
            <div className="lg:col-span-5 grid grid-cols-3 gap-3">
              {presets.map((p) => (
                <button
                  key={p}
                  onClick={() => setAmount(p.toString())}
                  className="w-full py-3 px-2 border border-slate-200 rounded-md text-slate-700 text-sm font-medium hover:border-[#f42619] hover:text-[#f42619] transition-all bg-white"
                >
                  {formatCurrencyLabel(p)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <StatusModal
        isOpen={modalType !== null}
        type={modalType || 'confirm'}
        amount={numericAmount}
        onConfirm={handleConfirmTopUp}
        onClose={handleCloseModal}
        isLoading={loading}
      />
    </div>
  );
};

export default TopUp;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BalanceCard from '../components/BalanceCard';
import StatusModal from '../components/StatusModal';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchProfile } from '../store/slices/profileSlice';
import { fetchBalance } from '../store/slices/balanceSlice';
import { fetchServices } from '../store/slices/serviceSlice';
import { postTransaction } from '../services/transactionService';

const Payment: React.FC = () => {
  const { serviceCode } = useParams<{ serviceCode: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const [modalType, setModalType] = useState<'confirm' | 'success' | 'failure' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: profile } = useAppSelector((state) => state.profile);
  const { data: services } = useAppSelector((state) => state.services);
  const { data: balanceData } = useAppSelector((state) => state.balance);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
    if (services.length === 0) {
      dispatch(fetchServices());
    }
  }, [dispatch, services.length]);

  const selectedService = services.find(s => s.service_code === serviceCode);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val).replace('IDR', 'Rp');
  };

  const welcomeName = profile ? `${profile.first_name} ${profile.last_name}` : '...';

  const handlePayClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedService) {
      setModalType('confirm');
    }
  };

  const handleConfirmPayment = async () => {
    if (!serviceCode) return;
    
    try {
      setIsSubmitting(true);
      const response = await postTransaction(serviceCode);
      
      if (response.status === 0) {
        setModalType('success');
        dispatch(fetchBalance()); // Refresh balance after successful transaction
      } else {
        setModalType('failure');
      }
    } catch (error) {
      setModalType('failure');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    if (modalType === 'success' || modalType === 'failure') {
      navigate('/dashboard');
    }
    setModalType(null);
  };

  if (!selectedService && services.length > 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Layanan tidak ditemukan</p>
      </div>
    );
  }

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

        {/* Payment Form Section */}
        <div className="max-w-full">
          <p className="text-slate-600 mb-1">PemBayaran</p>
          <div className="flex items-center gap-3 mb-10">
            {selectedService && (
              <img src={selectedService.service_icon} alt={selectedService.service_name} className="w-8 h-8 object-contain" />
            )}
            <h2 className="text-2xl font-bold text-slate-900">
              {selectedService?.service_name || '...'}
            </h2>
          </div>

          <form onSubmit={handlePayClick} className="max-w-full space-y-6">
            <div className="relative flex items-center border border-slate-300 rounded-md bg-white overflow-hidden opacity-80 cursor-not-allowed">
              <span className="pl-4 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </span>
              <input
                type="text"
                readOnly
                value={selectedService ? formatCurrency(selectedService.service_tariff) : '...'}
                className="w-full pl-3 pr-4 py-3 focus:outline-none text-slate-700 font-medium text-sm cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !selectedService}
              className="w-full font-bold py-3 rounded-md transition-all text-sm h-12 flex items-center justify-center bg-[#f42619] hover:bg-red-700 text-white shadow-md disabled:opacity-50"
            >
              Bayar
            </button>
          </form>
        </div>
      </main>

      {/* Modals */}
      <StatusModal
        isOpen={modalType !== null}
        type={modalType || 'confirm'}
        amount={selectedService?.service_tariff || 0}
        onConfirm={handleConfirmPayment}
        onClose={handleCloseModal}
        isLoading={isSubmitting}
        title={modalType === 'confirm' ? `Beli ${selectedService?.service_name} senilai` : `Pembayaran ${selectedService?.service_name} sebesar`}
        actionText="Ya, lanjutkan Bayar"
      />
    </div>
  );
};

export default Payment;

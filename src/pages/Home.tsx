import React, { useEffect } from 'react';
import Header from '../components/Header';
import BalanceCard from '../components/BalanceCard';
import ServiceGrid from '../components/ServiceGrid';
import BannerCarousel from '../components/BannerCarousel';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchProfile } from '../store/slices/profileSlice';
import { fetchBalance } from '../store/slices/balanceSlice';
import { fetchServices } from '../store/slices/serviceSlice';
import { fetchBanners } from '../store/slices/bannerSlice';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: profile } = useAppSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
    dispatch(fetchServices());
    dispatch(fetchBanners());
  }, [dispatch]);

  const welcomeName = profile ? `${profile.first_name} ${profile.last_name}` : '...';

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Welcome & Balance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 items-start">
          {/* Welcome Info */}
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
          
          {/* Balance Card */}
          <div className="lg:col-span-1" /> {/* Spacer for large screens */}
          
          <div className="lg:col-span-6">
            <BalanceCard />
          </div>
        </div>

        {/* Services Section */}
        <ServiceGrid />

        {/* Banners Section */}
        <BannerCarousel />
      </main>
    </div>
  );
};

export default Home;

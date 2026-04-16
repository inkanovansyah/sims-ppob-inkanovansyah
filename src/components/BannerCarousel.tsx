import React from 'react';
import { useAppSelector } from '../hooks/useRedux';

const BannerCarousel: React.FC = () => {
  const { data: banners, loading } = useAppSelector((state) => state.banners);

  return (
    <div className="py-6 overflow-hidden">
      <h4 className="text-sm font-bold text-slate-900 mb-6">Temukan promo menarik</h4>
      
      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {loading && banners.length === 0 ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="min-w-[280px] h-[120px] bg-slate-100 rounded-xl animate-pulse"></div>
          ))
        ) : (
          banners.map((banner, index) => (
            <div 
              key={index} 
              className="min-w-[280px] h-[120px] rounded-xl overflow-hidden cursor-pointer flex-shrink-0 transition-transform hover:scale-[1.02] shadow-sm hover:shadow-md"
            >
              <img 
                src={banner.banner_image} 
                alt={banner.banner_name} 
                className="w-full h-full object-cover"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BannerCarousel;

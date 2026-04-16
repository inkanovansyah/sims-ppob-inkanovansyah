import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchProfile, updateProfileInfo, uploadProfileImage, clearProfileError } from '../store/slices/profileSlice';
import { logout } from '../store/slices/authSlice';
import toast from 'react-hot-toast';

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: profile, loading, error } = useAppSelector((state) => state.profile);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    // Only update formData from profile when NOT editing to prevent overwriting user input
    if (profile && !isEditing) {
      setFormData({
        first_name: profile.first_name,
        last_name: profile.last_name,
      });
    }
  }, [profile, isEditing]);

  const handleEditToggle = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (isEditing) {
      // Revert if cancelling
      if (profile) {
        setFormData({
          first_name: profile.first_name,
          last_name: profile.last_name,
        });
      }
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(updateProfileInfo(formData));
    if (updateProfileInfo.fulfilled.match(resultAction)) {
      toast.success('Profil berhasil diperbarui');
      setIsEditing(false);
    } else {
      toast.error(error || 'Gagal memperbarui profil');
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation: Max 100KB
    if (file.size > 100 * 1024) {
      toast.error('Ukuran file terlalu besar. Maksimum 100 KB.');
      return;
    }

    const resultAction = await dispatch(uploadProfileImage(file));
    if (uploadProfileImage.fulfilled.match(resultAction)) {
      toast.success('Foto profil berhasil diperbarui');
    } else {
      toast.error('Gagal mengunggah foto profil');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logout berhasil');
  };

  const fullName = profile ? `${profile.first_name} ${profile.last_name}` : '...';

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 pt-32 pb-12 flex flex-col items-center">
        {/* Avatar Area */}
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm transition-opacity hover:opacity-90 cursor-pointer" onClick={handleImageClick}>
            <img 
              src={profile?.profile_image && !profile.profile_image.includes('null') ? profile.profile_image : '/assets/Profile Photo.png'} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <button 
            onClick={handleImageClick}
            className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-md hover:bg-slate-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange}
          />
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-12">{fullName}</h1>

        <form onSubmit={handleSave} className="w-full space-y-6">
          {/* Email field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <div className="relative flex items-center border border-slate-200 rounded-md bg-slate-50/50">
              <span className="pl-4 text-slate-400">@</span>
              <input
                type="email"
                disabled
                value={profile?.email || ''}
                className="w-full pl-3 pr-4 py-3 focus:outline-none text-slate-500 text-sm font-medium bg-transparent cursor-not-allowed"
              />
            </div>
          </div>

          {/* First Name field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Nama Depan</label>
            <div className={`relative flex items-center border rounded-md transition-all ${isEditing ? 'border-slate-300 focus-within:border-[#f42619]' : 'border-slate-200 bg-slate-50/50'}`}>
              <span className="pl-4 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input
                type="text"
                name="first_name"
                disabled={!isEditing}
                value={formData.first_name}
                onChange={handleInputChange}
                className={`w-full pl-3 pr-4 py-3 focus:outline-none text-sm font-medium ${isEditing ? 'text-slate-700' : 'text-slate-500 bg-transparent cursor-not-allowed'}`}
              />
            </div>
          </div>

          {/* Last Name field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Nama Belakang</label>
            <div className={`relative flex items-center border rounded-md transition-all ${isEditing ? 'border-slate-300 focus-within:border-[#f42619]' : 'border-slate-200 bg-slate-50/50'}`}>
              <span className="pl-4 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input
                type="text"
                name="last_name"
                disabled={!isEditing}
                value={formData.last_name}
                onChange={handleInputChange}
                className={`w-full pl-3 pr-4 py-3 focus:outline-none text-sm font-medium ${isEditing ? 'text-slate-700' : 'text-slate-500 bg-transparent cursor-not-allowed'}`}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-8 space-y-4">
            {!isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleEditToggle}
                  className="w-full font-bold py-3 rounded-md transition-all text-sm h-12 bg-white border border-[#f42619] text-[#f42619] hover:bg-red-50"
                  style={{ backgroundColor: 'white', borderColor: '#f42619' }}
                >
                  Edit Profil
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full font-bold py-3 rounded-md transition-all text-sm h-12 bg-[#f42619] text-white hover:bg-red-700 shadow-md"
                  style={{ backgroundColor: '#f42619' }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full font-bold py-3 rounded-md transition-all text-sm h-12 bg-[#f42619] text-white hover:bg-red-700 shadow-md disabled:opacity-50"
                  style={{ backgroundColor: '#f42619' }}
                >
                  {loading ? 'Menyimpan...' : 'Simpan'}
                </button>
                <button
                  type="button"
                  onClick={handleEditToggle}
                  className="w-full font-bold py-3 rounded-md transition-all text-sm h-12 bg-white border border-[#f42619] text-[#f42619] hover:bg-red-50"
                  style={{ backgroundColor: 'white', borderColor: '#f42619' }}
                >
                  Batalkan
                </button>
              </>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProfilePage;

import { ReactNode, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './components/PrivateRoute';
import PageLoader from './components/PageLoader';

/**
 * IMPLEMENTASI LAZY LOADING (CODE SPLITTING):
 * Membagi bundle aplikasi menjadi potongan-potongan (chunks) yang lebih kecil.
 * Halaman hanya akan dimuat ketika pengguna menavigasi ke rute tersebut.
 * Keuntungan: Loading awal aplikasi jauh lebih cepat.
 */

const Login = lazy(() => import('./pages/Login'));
const Registration = lazy(() => import('./pages/Registration'));
const Home = lazy(() => import('./pages/Home'));
const TopUp = lazy(() => import('./pages/TopUp'));
const Payment = lazy(() => import('./pages/Payment'));
const TransactionHistory = lazy(() => import('./pages/TransactionHistory'));
const ProfilePage = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <>
      {/* Toaster untuk notifikasi sukses/gagal di seluruh aplikasi */}
      <Toaster position="top-right" />
      
      {/* Suspense menangani tampilan fallback (Lodaing) saat komponen lazy sedang dimuat */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Rute Publik */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />

          {/* Rute Terproteksi (Hanya bisa diakses jika sudah login) */}
          <Route path="/dashboard" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/topup" element={<PrivateRoute><TopUp /></PrivateRoute>} />
          <Route path="/transaksi/:serviceCode" element={<PrivateRoute><Payment /></PrivateRoute>} />
          <Route path="/transaction" element={<PrivateRoute><TransactionHistory /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />

          {/* Fallback - Jika rute tidak ditemukan atau akses root, arahkan ke dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;

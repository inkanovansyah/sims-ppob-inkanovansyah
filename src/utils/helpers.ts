/**
 * Memformat angka menjadi format mata uang Rupiah (IDR)
 * Contoh: 10000 -> Rp 10.000
 */
export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount).replace('IDR', 'Rp');
};

/**
 * Memformat string tanggal ISO menjadi format tanggal Indonesia yang mudah dibaca
 * Contoh: 2023-10-27T10:00:00Z -> 27 Oktober 2023 17:00
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

/**
 * Melakukan validasi format email sederhana menggunakan Regex
 */
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

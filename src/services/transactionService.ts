import API from './api';
import { ENDPOINTS } from '../constants/endpoints';
import { APIResponse } from '../types/api';
import { TransactionResponse, HistoryResponse } from '../types/transaction';

/**
 * Melakukan transaksi pembayaran layanan
 * @param serviceCode Kode layanan (misal: "PLN", "PBB", dll)
 */
export const postTransaction = async (serviceCode: string) => {
  const response = await API.post<APIResponse<TransactionResponse>>(ENDPOINTS.TRANSACTION.POST, {
    service_code: serviceCode,
  });
  return response.data;
};

/**
 * Mengambil riwayat transaksi dengan sistem pagination
 * @param offset Titik mulai data (n)
 * @param limit Jumlah data yang diambil (limit)
 */
export const getHistory = async (offset: number, limit: number) => {
  const response = await API.get<APIResponse<HistoryResponse>>(ENDPOINTS.TRANSACTION.HISTORY, {
    params: { offset, limit },
  });
  return response.data;
};

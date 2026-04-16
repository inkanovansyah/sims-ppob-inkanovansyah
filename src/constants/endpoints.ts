export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/login',
    REGISTRATION: '/registration',
  },
  PROFILE: {
    GET: '/profile',
    UPDATE: '/profile/update',
    UPDATE_IMAGE: '/profile/image',
  },
  BALANCE: {
    GET: '/balance',
    TOPUP: '/topup',
  },
  SERVICE: {
    GET_SERVICES: '/services',
  },
  BANNER: {
    GET_BANNERS: '/banner',
  },
  TRANSACTION: {
    HISTORY: '/transaction/history',
    POST: '/transaction',
  },
} as const;

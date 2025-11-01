export const ErrorMessage = {
  LOGIN_FAILED: 'Login Failed',
  LOGOUT_FAILED: 'Logout Failed',
  SIGNUP_ERROR: 'An error occured during sign up',
  SERVER_ERROR: 'Unable to connect to the server. Please try again.',
  SESSION_EXPIRED: 'Session expired',
  FETCH_USERS_FAILED: 'Failed to fetch users',
  SOMETHING_WENT_WRONG: 'Something went wrong',
} as const;

export const FolderTypes = {
  PROFILE: 'profiles',
  DOCUMENT: 'documents',
} as const;

export const DocumentStatus = {
  Pending: 'pending',
  Verified: 'verified',
  Rejected: 'rejected',
} as const;

export const Documents = {
  Aadhaar: 'aadhaar',
  Licence: 'licence',
} as const;

export type JoinRequestStatus = 'pending' | 'accepted' | 'declined';

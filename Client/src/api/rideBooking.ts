import axiosInstance from '@/utils/axiosInstance';

const GET_RIDE_BOOKING_API = (id: string) => `/hike/${id}/booking`;
const GET_BOOKING_OTP_API = (id: string) => `/task/otp/${id}`;
const MARK_DROPOFF_API = (id: string) => `/hike/${id}/dropoff`;

export async function getRideBookingDetails(id: string) {
  const res = await axiosInstance.get(GET_RIDE_BOOKING_API(id));
  return res.data.data;
}

export async function getRideBookingOTP(id: string) {
  const res = await axiosInstance.get(GET_BOOKING_OTP_API(id));
  return res.data.data;
}

export async function markDropOff(bookingId: string) {
  const res = await axiosInstance.patch(MARK_DROPOFF_API(bookingId));
  return res.data.data;
}

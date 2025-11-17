import axiosInstance from '@/utils/axiosInstance';

const GET_RIDE_BOOKING_API = (id: string) => `/hike/${id}/booking`;
const GET_BOOKING_OTP_API = (id: string) => `/task/otp/${id}`;

export async function getRideBookingDetails(id: string) {
  const res = await axiosInstance.get(GET_RIDE_BOOKING_API(id));
  return res.data.data;
}

export async function getRideBookingOTP(id: string) {
  const res = await axiosInstance.get(GET_BOOKING_OTP_API(id));
  return res.data.data;
}

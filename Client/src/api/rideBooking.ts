import type { ApiResponse } from '@/types/ApiResponse';
import type { ReqCancelBookingResDTO } from '@/types/hike';
import axiosInstance from '@/utils/axiosInstance';

const GET_RIDE_BOOKING_API = (id: string) => `/hike/${id}/booking`;
const GET_LIVE_BOOKING_API = (id: string) => `/hike/${id}/booking/live`;
const GET_BOOKING_OTP_API = (id: string) => `/task/otp/${id}`;
const MARK_DROPOFF_API = (id: string) => `/hike/${id}/dropoff`;
const REQ_CANCEL_API = (id: string) => `/hike/${id}/cancel-request`;
const CANCEL_BOOKING_API = (id: string) => `/hike/${id}/cancel`;

export async function getRideBookingDetails(id: string) {
  const res = await axiosInstance.get(GET_RIDE_BOOKING_API(id));
  return res.data.data;
}
export async function getRideBookingLive(id: string) {
  const res = await axiosInstance.get(GET_LIVE_BOOKING_API(id));
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
export async function reqCancel(bookingId: string) {
  const res = await axiosInstance.get<ApiResponse<ReqCancelBookingResDTO>>(
    REQ_CANCEL_API(bookingId)
  );
  return res.data.data;
}
export async function cancelBooking(bookingId: string) {
  const res = await axiosInstance.patch(CANCEL_BOOKING_API(bookingId));
  return res.data.data;
}

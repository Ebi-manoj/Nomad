import axiosInstance from '@/utils/axiosInstance';

const GET_RIDE_BOOKING_API = (id: string) => `/hike/${id}/booking`;

export async function getRideBookingDetails(id: string) {
  const res = await axiosInstance.get(GET_RIDE_BOOKING_API(id));
  return res.data.data;
}

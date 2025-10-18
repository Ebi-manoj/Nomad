import { PickupInput } from '@/components/PickupInput';
import { SubmitBtn } from '@/components/SubmitBtn';
import { ToggleButton } from '@/components/ToogleButton';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { hikeSchema, type HikeFormData } from '@/validation/hike';
import type { CreateHikeDTO } from '@/store/features/user/hike/hike';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { createHike } from '@/store/features/user/hike/hike.thunk';
import { useNavigate } from 'react-router-dom';
import { CreateHikeRideLayout } from '@/layouts/CreateHikeRideLayout';

export const Hike = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<HikeFormData>({
    resolver: zodResolver(hikeSchema),
    defaultValues: {
      pickup: { description: '', lat: 0, lng: 0 },
      destination: { description: '', lat: 0, lng: 0 },
      hasHelmet: false,
      seatsRequested: 1,
    },
  });

  const onSubmit = async (data: HikeFormData) => {
    const pickup = {
      type: 'Point',
      coordinates: [data.pickup.lat, data.pickup.lng],
    };
    const destination = {
      type: 'Point',
      coordinates: [data.destination.lat, data.destination.lng],
    };

    const reqDto: CreateHikeDTO = {
      ...data,
      userId: user?.id!,
      pickup,
      destination,
      pickupAddress: data.pickup.description,
      destinationAddress: data.destination.description,
    };
    try {
      await dispatch(createHike(reqDto)).unwrap();
      navigate('/hike/match');
    } catch (error) {}
  };

  return (
    <CreateHikeRideLayout title="Find you next rides">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Pickup Input */}
        <div className="flex flex-col">
          <Controller
            name="pickup"
            control={control}
            render={({ field }) => (
              <PickupInput
                type="pickup"
                placeholder="Enter pickup location"
                onSelect={val => field.onChange(val)}
              />
            )}
          />
          {errors.pickup?.description && (
            <p className="text-sm text-red-500 mt-1">
              {errors.pickup.description.message}
            </p>
          )}
        </div>

        {/* Dropoff Input */}
        <div className="flex flex-col">
          <Controller
            name="destination"
            control={control}
            render={({ field }) => (
              <PickupInput
                type="dropoff"
                placeholder="Enter destination"
                onSelect={val => field.onChange(val)}
              />
            )}
          />
          {errors.destination?.description && (
            <p className="text-sm text-red-500 mt-1">
              {errors.destination.description.message}
            </p>
          )}
        </div>

        {/* Helmet Toggle */}
        <Controller
          name="hasHelmet"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-800">
                Do you have helmets?
              </label>
              <ToggleButton
                state={field.value}
                clickHandler={() => field.onChange(!field.value)}
              />
            </div>
          )}
        />

        {/* Seats */}
        <Controller
          name="seatsRequested"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between">
              <label
                htmlFor="seats"
                className="text-sm font-medium text-gray-800"
              >
                Number of seats
              </label>
              <input
                type="number"
                id="seats"
                min="1"
                max="3"
                {...field}
                onChange={e => field.onChange(Number(e.target.value))}
                className="w-20 px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-center"
              />
            </div>
          )}
        />
        {errors.seatsRequested && (
          <p className="text-sm text-red-500">
            {errors.seatsRequested.message}
          </p>
        )}

        <SubmitBtn text="Find rides" isLoading={isSubmitting} />

        <p className="text-xs text-gray-500 text-center mt-3">
          <i>*All riders are KYC verified for your safety</i>
        </p>
      </form>
    </CreateHikeRideLayout>
  );
};

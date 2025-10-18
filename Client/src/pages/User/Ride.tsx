import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PickupInput } from '@/components/PickupInput';
import { SubmitBtn } from '@/components/SubmitBtn';
import { ToggleButton } from '@/components/ToogleButton';
import { FaMotorcycle, FaCar } from 'react-icons/fa';
import { CreateHikeRideLayout } from '@/layouts/CreateHikeRideLayout';
import { rideSchema, type RideFormData } from '@/validation/Ride';

export const Ride = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RideFormData>({
    resolver: zodResolver(rideSchema),
    defaultValues: {
      pickup: { description: '', lat: 0, lng: 0 },
      destination: { description: '', lat: 0, lng: 0 },
      vehicleType: 'bike',
      seatsRequested: 1,
      hasHelmet: false,
      vehicleModel: '',
      vehicleNumber: '',
      costPerKm: 0,
    },
  });

  const vehicleType = watch('vehicleType');

  const onSubmit = (data: RideFormData) => {
    console.log('Ride form submitted:', data);
  };

  return (
    <CreateHikeRideLayout title="Start your Journey">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Pickup Input */}
        <div className="flex flex-col">
          <Controller
            name="pickup"
            control={control}
            render={({ field }) => (
              <PickupInput
                type="pickup"
                placeholder="Enter location"
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
        {/* Destination Input */}
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
        {/* Vehicle Type */}

        <Controller
          name="vehicleType"
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-800 mb-1">
                Select vehicle type
              </label>
              {/* Bike Button */}
              <button
                type="button"
                className={`flex items-center justify-center w-12 h-12 border rounded-lg transition-colors ${
                  field.value === 'bike'
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-gray-300'
                }`}
                onClick={() => field.onChange('bike')}
              >
                <FaMotorcycle size={20} />
              </button>

              {/* Car Button */}
              <button
                type="button"
                className={`flex items-center justify-center w-12 h-12 border rounded-lg transition-colors ${
                  field.value === 'car'
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-gray-300'
                }`}
                onClick={() => field.onChange('car')}
              >
                <FaCar size={20} />
              </button>
            </div>
          )}
        />
        {errors.vehicleType && (
          <p className="text-sm text-red-500 mt-1">
            {errors.vehicleType.message}
          </p>
        )}
        {/* Seats only for car */}
        {vehicleType === 'car' && (
          <Controller
            name="seatsRequested"
            control={control}
            render={({ field }) => (
              <div className="flex items-center justify-between mt-2">
                <label className="text-sm font-medium text-gray-800">
                  Available seats
                </label>
                <input
                  type="number"
                  min={1}
                  max={4}
                  {...field}
                  onChange={e => field.onChange(Number(e.target.value))}
                  className="w-20 px-3 py-1.5 border border-gray-300 rounded-lg text-center"
                />
              </div>
            )}
          />
        )}
        {errors.seatsRequested && (
          <p className="text-sm text-red-500 mt-1">
            {errors.seatsRequested.message}
          </p>
        )}
        {/* Helmet only if bike */}
        {vehicleType === 'bike' && (
          <Controller
            name="hasHelmet"
            control={control}
            render={({ field }) => (
              <div className="flex items-center mt-2">
                <ToggleButton
                  state={!!field.value} // ensure boolean
                  clickHandler={() => field.onChange(!field.value)}
                />
                <span className="ml-2 text-gray-800 text-sm">
                  Do you have helmet
                </span>
              </div>
            )}
          />
        )}
        {/* Vehicle Model & Number in flex row */}
        <div className="flex gap-4 mt-2">
          <div className="flex-1">
            <Controller
              name="vehicleModel"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="Vehicle model"
                  {...field}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              )}
            />
            {errors.vehicleModel && (
              <p className="text-sm text-red-500 mt-1">
                {errors.vehicleModel.message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <Controller
              name="vehicleNumber"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="Vehicle number"
                  {...field}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              )}
            />
            {errors.vehicleNumber && (
              <p className="text-sm text-red-500 mt-1">
                {errors.vehicleNumber.message}
              </p>
            )}
          </div>
        </div>
        {/* Cost per km with label */}
        <Controller
          name="costPerKm"
          control={control}
          render={({ field }) => (
            <div className="mt-2">
              <label className="text-sm font-medium text-gray-800">
                Cost sharing{' '}
                <span className="text-xs text-gray-500">(max 15)</span>
              </label>
              <input
                type="number"
                value={field.value}
                onChange={e => field.onChange(Number(e.target.value))} // convert string to number
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.costPerKm && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.costPerKm.message}
                </p>
              )}
            </div>
          )}
        />
        <SubmitBtn text="Publish Ride" isLoading={isSubmitting} />
        <p className="text-xs text-gray-500 text-center mt-3">
          *Your ride will be visible to hikers once published. Make sure details
          are correct.
        </p>
      </form>
    </CreateHikeRideLayout>
  );
};

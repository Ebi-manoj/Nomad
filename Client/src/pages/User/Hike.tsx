import { PickupInput } from '@/components/PickupInput';
import { SubmitBtn } from '@/components/SubmitBtn';
import { ToggleButton } from '@/components/ToogleButton';
import { MapComponent } from '@/components/MapComponent';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { hikeSchema, type HikeFormData } from '@/validation/hike';

export const Hike = () => {
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

  console.log(control);

  const onSubmit = (data: HikeFormData) => {
    console.log('Form submitted ✅', data);
    // Call API to create hike here
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Find Your Next Ride</h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Pickup Input */}
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
              <p className="text-sm text-red-500">
                {errors.pickup.description.message}
              </p>
            )}

            {/* Dropoff Input */}
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
              <p className="text-sm text-red-500">
                {errors.destination.description.message}
              </p>
            )}

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
        </div>

        {/* Map Section */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm h-[500px] lg:h-[600px]">
          <div className="map-placeholder w-full h-full relative">
            {/* <MapComponent /> */}

            <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
              <button className="bg-white border border-gray-300 w-10 h-10 rounded-lg shadow-md hover:bg-gray-50 transition-colors">
                <i className="fas fa-plus"></i>
              </button>
              <button className="bg-white border border-gray-300 w-10 h-10 rounded-lg shadow-md hover:bg-gray-50 transition-colors">
                <i className="fas fa-minus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

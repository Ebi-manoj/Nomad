import { PickupInput } from '@/components/PickupInput';
import { SubmitBtn } from '@/components/SubmitBtn';
import { ToggleButton } from '@/components/ToogleButton';
import { useState } from 'react';
import { MapComponent } from '@/components/MapComponent';

export const Hike = () => {
  const [hasHelmet, setHasHelmet] = useState(false);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Find Your Next Ride</h2>

          <form className="space-y-4">
            <PickupInput
              onSelect={pickup => console.log(pickup)}
              type="pickup"
              placeholder="Enter location"
            />
            <PickupInput
              onSelect={pickup => console.log(pickup)}
              type="dropoff"
              placeholder="Enter destination"
            />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="helmet-toggle"
                  className="text-sm font-medium text-gray-800"
                >
                  Do you have helmets?
                </label>
                <ToggleButton
                  state={hasHelmet}
                  clickHandler={() => setHasHelmet(prev => !prev)}
                />
              </div>
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
                  defaultValue="1"
                  className="w-20 px-3 py-1.5 border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-black text-center"
                />
              </div>
            </div>
            <SubmitBtn text="Find rides" isLoading={false} />

            <p className="text-xs text-gray-500 text-center mt-3">
              <i>*All riders are KYC verified for your safety</i>
            </p>
          </form>
        </div>

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

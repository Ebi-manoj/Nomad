import { UserNavbar } from '@/components/UserNavbar';
import { RiStopCircleFill } from 'react-icons/ri';
import { FaPaperPlane } from 'react-icons/fa6';
import { FaMapPin } from 'react-icons/fa6';
import { useState } from 'react';
import { ToggleButton } from '@/components/ToogleButton';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

export const Home = () => {
  const [hasHelmet, setHasHelmet] = useState(false);
  const { token } = useSelector((state: RootState) => state.auth);
  console.log(token);
  return (
    <div className="bg-white text-gray-900">
      <UserNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Find Your Next Ride</h2>

            <form className="space-y-4">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <RiStopCircleFill />
                </div>
                <input
                  type="text"
                  placeholder="Enter location"
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <FaPaperPlane />
                </button>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <FaMapPin />
                </div>
                <input
                  type="text"
                  placeholder="Enter destination"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div className="space-y-6">
                {/* Helmet Toggle */}
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

                {/* Seats input */}
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
                    max="4"
                    defaultValue="1"
                    className="w-20 px-3 py-1.5 border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-black text-center"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors mt-6"
              >
                Find rides
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                <i>*All rides are KYC verified for your safety</i>
              </p>
            </form>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm h-[500px] lg:h-[600px]">
            <div className="map-placeholder w-full h-full relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <i className="fas fa-map text-6xl mb-4"></i>
                  <p className="text-lg font-medium">Interactive Map View</p>
                  <p className="text-sm mt-2">
                    Available rides will appear here
                  </p>
                </div>
              </div>

              <div
                className="car-icon"
                style={{
                  top: '20%',
                  left: '30%',
                  color: '#ffd700',
                  animationDelay: '0s',
                }}
              >
                <i className="fas fa-taxi"></i>
              </div>
              <div
                className="car-icon"
                style={{
                  top: '60%',
                  left: '70%',
                  color: '#ffd700',
                  animationDelay: '1s',
                }}
              >
                <i className="fas fa-taxi"></i>
              </div>
              <div
                className="car-icon"
                style={{
                  top: '40%',
                  left: '50%',
                  color: '#ffd700',
                  animationDelay: '2s',
                }}
              >
                <i className="fas fa-taxi"></i>
              </div>
              <div
                className="car-icon"
                style={{
                  top: '75%',
                  left: '25%',
                  color: '#ffd700',
                  animationDelay: '1.5s',
                }}
              >
                <i className="fas fa-taxi"></i>
              </div>

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
    </div>
  );
};

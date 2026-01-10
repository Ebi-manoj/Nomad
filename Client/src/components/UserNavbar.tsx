import { PiPersonSimpleHikeBold } from 'react-icons/pi';
import { RiMotorbikeFill } from 'react-icons/ri';
import { LuNotebookText } from 'react-icons/lu';

import { ProfilePopover } from './ProfilePopover';
import { Link, useLocation } from 'react-router-dom';
import { NotificationBell } from './NotificationBell';

export const UserNavbar = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-extrabold tracking-tight cursor-pointer">
              NOMAD
            </h1>
          </div>

          <div className="flex items-center gap-6 md:gap-20">
            <Link
              to={'/hike'}
              className={`flex items-center gap-1 text-gray-900 font-medium ${
                path.startsWith('/hike') && 'border-b-2'
              }  border-black pb-1 cursor-pointer`}
            >
              <PiPersonSimpleHikeBold className="w-5 h-5" />
              Hike
            </Link>
            <Link
              to={'/ride'}
              className={`flex items-center gap-1 text-gray-900 font-medium ${
                path.startsWith('/ride') && 'border-b-2'
              }  border-black pb-1 cursor-pointer`}
            >
              <RiMotorbikeFill className="w-5 h-5" />
              Ride
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <NotificationBell />
            <Link to={'/activity'} className="hidden md:block">
              <button
                className={`cursor-pointer flex items-center gap-1 pb-1   border-black hover:text-gray-600 rounded-lg font-medium transition-colors
                  ${path == '/activity' && 'border-b-2 rounded-b-none'}
                  `}
              >
                <LuNotebookText />
                Activity
              </button>
            </Link>
            <ProfilePopover />
          </div>
        </div>
      </div>
    </nav>
  );
};

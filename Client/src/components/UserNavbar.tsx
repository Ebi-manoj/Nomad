import { PiPersonSimpleHikeBold } from 'react-icons/pi';
import { RiMotorbikeFill } from 'react-icons/ri';
import { LuNotebookText } from 'react-icons/lu';
import { IoNotificationsSharp } from 'react-icons/io5';

import { ProfilePopover } from './ProfilePopover';

export const UserNavbar = () => {
  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-extrabold tracking-tight cursor-pointer">
              NOMAD
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-20">
            <a className="flex items-center gap-1 text-gray-900 font-medium border-b-2 border-black pb-1 cursor-pointer">
              <PiPersonSimpleHikeBold className="w-5 h-5" />
              Hike
            </a>
            <a className="flex items-center gap-1 text-gray-900 font-medium  border-black pb-1 cursor-pointer">
              <RiMotorbikeFill className="w-5 h-5" />
              Ride
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors">
              <IoNotificationsSharp />
            </button>
            <button className="cursor-pointer flex items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
              <LuNotebookText />
              Activity
            </button>
            <ProfilePopover />
          </div>
        </div>
      </div>
    </nav>
  );
};

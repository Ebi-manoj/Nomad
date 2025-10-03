import { RiStopCircleFill } from 'react-icons/ri';
import { FaPaperPlane } from 'react-icons/fa6';
export const PickupInput = () => {
  return (
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
  );
};

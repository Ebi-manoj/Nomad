import { FaMapPin } from 'react-icons/fa6';
export const DropoffInput = () => {
  return (
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
  );
};

import { RiStopCircleFill } from 'react-icons/ri';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { FaPaperPlane } from 'react-icons/fa6';
import { FaMapPin } from 'react-icons/fa6';

type onSelectProps = {
  description: string;
  lat: number;
  lng: number;
};

type PickupInputProps = {
  onSelect: (arg: onSelectProps) => void;
  type: 'pickup' | 'dropoff';
  placeholder: string;
};

export const PickupInput = ({
  onSelect,
  type,
  placeholder,
}: PickupInputProps) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: 'in' },
    },
    debounce: 300,
  });
  const handleSelect = async (description: string) => {
    setValue(description, false);
    clearSuggestions();

    // Get coordinates
    const results = await getGeocode({ address: description });
    const { lat, lng } = getLatLng(results[0]);
    onSelect({ description, lat, lng });
  };
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        {type == 'pickup' && <RiStopCircleFill />}
        {type == 'dropoff' && <FaMapPin />}
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        disabled={!ready}
        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
      />
      {type == 'pickup' && (
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          <FaPaperPlane />
        </button>
      )}
      {status === 'OK' && (
        <ul className="absolute bg-white border border-gray-300 rounded-lg w-full mt-1 max-h-60 overflow-y-auto z-50">
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(description)}
            >
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

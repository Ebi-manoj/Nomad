import { Bike, Car, IndianRupee } from 'lucide-react';

interface RideStatsProps {
  vehicleModel: string;
  vehicleNumber: string;
  totalDistance: string;
  costSharing: number;
}

export function RideStats({
  vehicleModel,
  vehicleNumber,
  totalDistance,
  costSharing,
}: RideStatsProps) {
  const stats = [
    {
      icon: <Car size={18} className="text-gray-700" />,
      label: 'Vehicle',
      value: `${vehicleModel} (${vehicleNumber})`,
    },
    {
      icon: <Bike size={18} className="text-gray-700" />,
      label: 'Total distance',
      value: totalDistance,
    },
    {
      icon: <IndianRupee size={18} className="text-gray-700" />,
      label: 'Cost sharing',
      value: costSharing,
    },
  ];

  return (
    <div className="space-y-4 text-[0.95rem] flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      {stats.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-white/70 shadow-sm hover:shadow-md hover:bg-white transition"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200/60 text-gray-800">
            {item.icon}
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">{item.label}</span>
            <span className="text-gray-800 font-semibold">{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

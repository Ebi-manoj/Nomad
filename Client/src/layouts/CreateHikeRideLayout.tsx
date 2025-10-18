import { MapComponent } from '@/components/MapComponent';

type CreateHikeRideLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export const CreateHikeRideLayout = ({
  title,
  children,
}: CreateHikeRideLayoutProps) => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Form Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">{title}</h2>
          {children}
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

export const CancelledHeader = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold mb-3">
        Hike <span className="text-red-500">cancelled</span>
        <span className="ml-2">⚠️</span>
      </h1>
      <p className="text-gray-600 text-lg">
        We're sorry your hike couldn't continue with{" "}
        <span className="font-semibold text-gray-900">Nomad</span>
      </p>
      <p className="text-gray-500 text-sm mt-1">
        Your refund status and rider details are shown below
      </p>
    </div>
  );
};

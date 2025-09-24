export const AuthInput = (props: { type: string; label: string }) => {
  return (
    <div>
      <label className="block text-sm mb-1 text-gray-700">{props.label}</label>
      <input
        id="name"
        name="name"
        type={props.type}
        className="w-full border border-gray-300  text-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 px-3 py-2.5"
        required
      />
    </div>
  );
};

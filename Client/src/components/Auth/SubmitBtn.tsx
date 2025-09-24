export const SubmitBtn = (props: { text: string }) => {
  return (
    <button
      type="submit"
      className="mt-2 w-full cursor-pointer  bg-black text-white font-semibold py-2.5 rounded-md hover:bg-gray-900 transition duration-200"
    >
      {props.text}
    </button>
  );
};

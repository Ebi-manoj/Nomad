import { Loader } from 'lucide-react';

export const SubmitBtn = (props: { text: string; isLoading: boolean }) => {
  return (
    <button
      type="submit"
      className="mt-2 w-full cursor-pointer  bg-black text-white font-semibold py-2.5 rounded-md
       disabled:opacity-80 disabled:cursor-not-allowed hover:bg-gray-900 transition duration-200"
      disabled={props.isLoading}
    >
      {props.isLoading ? (
        <Loader className="mx-auto animate-spin" />
      ) : (
        props.text
      )}
    </button>
  );
};

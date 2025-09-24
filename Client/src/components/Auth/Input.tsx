import type { FieldError, Path, UseFormRegister } from 'react-hook-form';

type inputType<T extends Record<string, any>> = {
  type: string;
  label: string;
  name: Path<T>;
  error?: FieldError;
  register: UseFormRegister<T>;
};

export const AuthInput = <T extends Record<string, any>>(
  props: inputType<T>
) => {
  return (
    <div>
      <label className="block text-sm mb-1 text-gray-700">{props.label}</label>
      <input
        type={props.type}
        className={`w-full border ${
          props.error ? 'border-red-500' : 'border-gray-300'
        } text-gray-500 rounded-md focus:outline-none focus:ring-1 ${
          props.error
            ? 'focus:ring-red-500 focus:border-red-500'
            : 'focus:ring-gray-400 focus:border-gray-400'
        } px-3 py-2.5`}
        {...props.register(props.name)}
      />
      {props.error?.message && (
        <p className="text-red-500 text-xs">{props.error.message}</p>
      )}
    </div>
  );
};

type toggleState = {
  state: boolean;
  clickHandler: () => void;
};

export const ToggleButton = (props: toggleState) => {
  return (
    <button
      id="helmet-toggle"
      type="button"
      role="switch"
      aria-checked={props.state}
      onClick={() => props.clickHandler()}
      className={`relative inline-flex h-6 w-11 items-center rounded-full border transition-colors 
        ${
          props.state ? 'bg-black border-black' : 'bg-gray-200 border-gray-300'
        }`}
    >
      <span
        className={`inline-block h-4 w-4 cursor-pointer transform rounded-full bg-white transition-transform
        ${props.state ? 'translate-x-5' : 'translate-x-1'}`}
      />
    </button>
  );
};

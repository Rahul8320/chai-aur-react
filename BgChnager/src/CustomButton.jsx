const CustomButton = ({ name, onClickHandler }) => {
  return (
    <button
      className="px-4 py-1 rounded-full shadow-md outline-none text-white text-xl font-sans"
      style={{ backgroundColor: name }}
      onClick={() => onClickHandler(name)}
    >
      {name.toUpperCase()}
    </button>
  );
};

export default CustomButton;

const Button = ({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  txtColor = "text-white",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg ${bgColor} ${txtColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

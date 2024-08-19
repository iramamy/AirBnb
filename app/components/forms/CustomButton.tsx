interface CustomButtonProps {
  label: string;
  onClick?: () => void;
  isAbsolute?: boolean;
  isPrev?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  isAbsolute,
  isPrev,
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`text-white ${isAbsolute && "absolute"} end-2.5 bottom-2.5 ${
        isPrev ? "bg-black hover:bg-gray-800" : "bg-airbnb hover:bg-airbnb-dark"
      } font-medium rounded-lg text-sm px-4 py-2 `}
    >
      {label}
    </button>
  );
};

export default CustomButton;

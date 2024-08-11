interface CustomButtonProps {
  label: string;
  onClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="text-white absolute end-2.5 bottom-2.5 bg-airbnb hover:bg-airbnb-dark font-medium rounded-lg text-sm px-4 py-2 "
    >
      {label}
    </button>
  );
};

export default CustomButton;

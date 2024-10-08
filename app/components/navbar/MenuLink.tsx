"use client";

interface MenuLinkProps {
  label: string;
  onClick: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  extra_args?: any;
}
const MenuLink: React.FC<MenuLinkProps> = ({
  label,
  isFirst,
  isLast,
  onClick,
  extra_args,
}) => {
  return (
    <div
      onClick={onClick}
      className={`px-5 py-2 hover:bg-gray-100 cursor-pointer ${
        isFirst ? "rounded-t-xl" : ""
      } ${isLast ? "rounded-b-xl" : ""}`}
    >
      {label}
    </div>
  );
};

export default MenuLink;

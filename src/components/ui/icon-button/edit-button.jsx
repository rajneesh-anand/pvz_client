import CloseIcon from "@assets/icons/close-icon";
import cn from "classnames";

const EditButton = ({ className, onClick, color }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Edit Button"
      className={cn(
        "inline-flex items-center justify-center w-8 h-8 transition duration-200 text-base text-opacity-50 focus:outline-none  hover:text-opacity-100 rounded-full",
        className
      )}
    >
      <CloseIcon className="text-xl lg:text-2xl" color={color} />
    </button>
  );
};

export default EditButton;

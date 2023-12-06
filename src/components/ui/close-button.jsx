import CloseIcon from "@assets/icons/close-icon";
import cn from "classnames";

const CloseButton = ({ className, onClick, color }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Close Button"
      className={cn(
        "fixed right-0.5 top-0.5 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-base  text-opacity-50 transition duration-200 hover:text-opacity-100 focus:outline-none md:right-2 md:top-2 lg:right-7 lg:top-7 lg:bg-transparent xl:right-10 xl:top-10",
        className
      )}
    >
      <CloseIcon className="text-xl lg:text-2xl" color={color} />
    </button>
  );
};

export default CloseButton;

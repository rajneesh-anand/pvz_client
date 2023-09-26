import NotificationIcon from "@assets/icons/notification-icon";
import cn from "classnames";

const NotificationButton = ({ className, onClick, color }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Notification Button"
      className={cn(
        "inline-flex items-center justify-center w-8 h-8 transition duration-200 text-base text-opacity-50 focus:outline-none  hover:text-opacity-100 rounded-full",
        className
      )}
    >
      <NotificationIcon className="text-xl lg:text-2xl" color={color} />
    </button>
  );
};

export default NotificationButton;

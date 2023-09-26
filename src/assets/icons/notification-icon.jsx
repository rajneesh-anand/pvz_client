const NotificationIcon = ({ color, ...rest }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...rest}>
      <path
        d="M12 23a2 2 0 0 0 2-2H10A2 2 0 0 0 12 23zM4 19H20a1 1 0 0 0 .707-1.707L19 15.586V10a7.006 7.006 0 0 0-6-6.92V2a1 1 0 0 0-2 0V3.08A7.006 7.006 0 0 0 5 10v5.586L3.293 17.293A1 1 0 0 0 4 19zm2.707-2.293A1 1 0 0 0 7 16V10a5 5 0 0 1 10 0v6a1 1 0 0 0 .293.707l.293.293H6.414z"
        fill={color}
        stroke={color}
        strokeWidth="0"
      />
    </svg>
  );
};

export default NotificationIcon;

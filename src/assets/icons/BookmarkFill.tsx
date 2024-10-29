const BookmarkFill = ({ width = 24, height = 24, color = '#1D2228', ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.3572 2.5H6.64288C5.45895 2.5 4.51073 3.44472 4.51073 4.61111L4.50098 19.9913C4.50052 20.7071 5.23045 21.1916 5.88995 20.9131L12 18.3333L18.111 20.9135C18.7703 21.1919 19.5 20.7079 19.5 19.9923V4.61111C19.5 3.44472 18.5411 2.5 17.3572 2.5Z"
        fill={color}
      />
    </svg>
  );
};

export default BookmarkFill;

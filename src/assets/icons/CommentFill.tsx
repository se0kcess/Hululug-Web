const CommentFill = ({ width = 24, height = 24, color = '#1D2228', ...props }) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 12C2.5 6.75315 6.75315 2.5 12 2.5C17.2468 2.5 21.5 6.75315 21.5 12C21.5 17.2468 17.2468 21.5 12 21.5C10.7346 21.5 9.3343 21.2521 8.2 20.7286C6.97165 21.1846 5.36615 21.4924 4.4 21.4705C3.68465 21.4534 3.24956 20.7001 3.59821 20.075C4.22996 18.9454 4.39525 18.0239 3.925 17.0464L3.18304 15.533C2.74889 14.4329 2.5 13.2084 2.5 12Z"
        fill={color}
      />
    </svg>
  );
};

export default CommentFill;

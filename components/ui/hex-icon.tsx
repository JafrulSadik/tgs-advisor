const HexIcon = ({ color1 = "#50ABDD", color2 = "#00BDF2", size = 98 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 102 98"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M76.5743 98H25.4257L0 49.5784L25.4257 0H76.5743L102 49.5784L76.5743 98ZM27.2099 94.8601H74.9388L98.7289 49.5784L74.9388 2.80941H27.2099L3.27114 49.5784L27.2099 94.8601Z"
        fill={color1}
      />
      <path
        d="M72.4631 7H29.3894L8 48.9168L29.3894 91H72.4631L94 48.9168L72.4631 7Z"
        fill={color2}
      />
    </svg>
  );
};

export default HexIcon;

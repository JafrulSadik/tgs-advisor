type HexagonProps = {
  height?: number;
  width?: number;
  color?: string;
};

export default function Hexagon({ height, width, color }: HexagonProps) {
  return (
    <svg
      width={width || "100%"}
      height={height || "100%"}
      viewBox="0 0 82 71"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_2)">
        <path
          d="M20.75 1H60.2498L80 34.9327L60.2498 69H20.75L1 34.9327L20.75 1Z"
          fill="#F1F2F2"
        />
        <path
          d="M0 35.4599L20.3141 0H61.0611L81.8505 35.4599L61.4175 70.9199H20.3141L0 35.4599ZM78.8806 35.4599L59.7544 2.6004H21.6209L2.61353 35.4599L21.6209 68.4378H59.7544L78.8806 35.4599Z"
          fill={color || "#F68D3A"}
        />
        <path
          d="M23.4028 5.0825H58.0912L75.4357 34.8688L58.0912 64.7731H23.4028L6.05859 34.8688L23.4028 5.0825Z"
          fill={color || "#F68D3A"}
        />
      </g>
      <defs>
        <clipPath id="clip0_1_2">
          <rect width={82} height={71} fill={color || "#F68D3A"} />
        </clipPath>
      </defs>
    </svg>
  );
}

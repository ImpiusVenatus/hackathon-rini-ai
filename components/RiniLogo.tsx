import * as React from "react";

interface RiniLogoProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}

const RiniLogo = ({
  color = "#199980",
  size = 26,
  ...props
}: RiniLogoProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 26 26"
    width={size}
    height={size}
    fill="none"
    {...props}
  >
    <path
      fill={color}
      fillRule="evenodd"
      d="m12.337 12.41 12.713.16c-6.443 2.345-10.968 6.155-12.553 12.553l-.16-12.713Z"
      clipRule="evenodd"
    />
    <path
      fill={color}
      fillRule="evenodd"
      d="M10.875 21.75C4.873 21.75 0 16.876 0 10.874S4.873 0 10.875 0s10.874 4.873 10.874 10.875h-4.217a6.66 6.66 0 0 0-6.657-6.657 6.66 6.66 0 0 0-6.657 6.657 6.66 6.66 0 0 0 6.657 6.657v4.217Z"
      clipRule="evenodd"
    />
  </svg>
);
export default RiniLogo;

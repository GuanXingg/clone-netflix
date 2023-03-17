interface IconProps {
  size?: number;
  stroke?: string;
  fill?: string;
}

export const BarsIcon = ({ size = 20, stroke = 'currentColor', fill = 'none' }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={fill}
      stroke={stroke}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
};

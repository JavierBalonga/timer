import { SVGAttributes } from "react";

const MinusIcon = (props: SVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      fill="currentColor"
      fillRule="evenodd"
      {...props}
    >
      <path d="M18 10a1 1 0 01-1 1H3a1 1 0 110-2h14a1 1 0 011 1z" />
    </svg>
  );
};

export default MinusIcon;

import { SVGAttributes } from "react";

const PlusIcon = (props: SVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      fill="currentColor"
      fillRule="evenodd"
      {...props}
    >
      <path d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z" />
    </svg>
  );
};

export default PlusIcon;

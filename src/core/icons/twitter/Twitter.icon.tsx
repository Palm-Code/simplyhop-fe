import React from "react";

interface TwitterProps {
  className?: string;
}

export const Twitter: React.FC<TwitterProps> = ({ className }) => {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_1129_372)">
        <mask
          id="mask0_1129_372"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="19"
          height="19"
        >
          <path
            d="M0.166016 0.166504H18.8327V18.8332H0.166016V0.166504Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_1129_372)">
          <path
            d="M14.866 1.04126H17.7287L11.4753 8.20659L18.8327 17.9586H13.0727L8.55801 12.0453L3.39802 17.9586H0.532682L7.22068 10.2919L0.166016 1.04259H6.07268L10.1473 6.44659L14.866 1.04126ZM13.8593 16.2413H15.446L5.20602 2.66926H3.50468L13.8593 16.2413Z"
            className="fill-[#232323] dark:fill-[white]"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_1129_372">
          <rect
            width="18.6667"
            height="18.6667"
            fill="white"
            transform="translate(0.166992 0.166748)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/core/icons";

export interface OrganizationCardRegisterAuthProps {
  name?: string;
  address?: string;
  image?: string;
  cta?: {
    children: React.ReactNode;
    onClick: () => void;
  };
}

export const OrganizationCardRegisterAuth = ({
  name,
  address,
  image,
  cta,
}: OrganizationCardRegisterAuthProps) => {
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center gap-6",
        "w-full h-full",
        "border border-[#EFEFEF] dark:border-[#464646]",
        "rounded-[10px]",
        "p-4"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-center place-items-center gap-4",
          "w-full"
        )}
      >
        {imageError || !image?.length ? (
          <div
            className={clsx(
              "w-15 h-15",
              "rounded-full",
              "flex items-center justify-center",
              "bg-[#F0F0F0] dark:bg-[#767676]"
            )}
          >
            <SVGIcon
              name="Building2"
              className={clsx("w-8 h-8", "text-[#249124] dark:text-[#33CC33]")}
            />
          </div>
        ) : (
          <img
            src={image}
            className={clsx("h-15")}
            onError={handleImageError}
          />
        )}

        <p
          className={clsx(
            "text-[#232323] dark:text-[white] text-base font-semibold"
          )}
        >
          {name}
        </p>
        <p
          className={clsx(
            "text-[#979797] dark:text-[#C3C3C3] text-sm font-normal"
          )}
        >
          {address}
        </p>
      </div>
      {cta && (
        <button
          className={clsx(
            "flex items-center justify-center",
            "w-full",
            "px-3 py-3",
            "text-[#249124] dark:text-[#33CC33] text-sm font-bold",
            "cursor-pointer"
          )}
          onClick={cta.onClick}
        >
          {cta.children}
        </button>
      )}
    </div>
  );
};

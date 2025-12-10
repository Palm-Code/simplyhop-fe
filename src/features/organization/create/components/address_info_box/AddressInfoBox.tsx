import clsx from "clsx";

export interface AddressInfoBoxProps {
  street: string;
  zipcode: string;
  city: string;
  country: string;
}

export const AddressInfoBox = ({
  street,
  zipcode,
  city,
  country,
}: AddressInfoBoxProps) => {
  return (
    <div
      className={clsx(
        "flex items-start gap-3",
        "w-full",
        "px-4 py-3",
        "bg-white dark:bg-[#232323]",
        "border border-[#E9E6E6] dark:border-[#464646]",
        "rounded-lg",
        "shadow-md"
      )}
    >
      <div className={clsx("flex flex-col gap-0.5")}>
        <p
          className={clsx(
            "text-base font-semibold",
            "text-[#232323] dark:text-white"
          )}
        >
          {street}
        </p>
        <p
          className={clsx(
            "text-[0.625rem] font-normal",
            "text-[#5B5B5B] dark:text-[#C3C3C3]"
          )}
        >
          {[zipcode, city, country].filter(Boolean).join(", ")}
        </p>
      </div>
    </div>
  );
};

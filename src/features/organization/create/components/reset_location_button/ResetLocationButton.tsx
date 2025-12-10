import clsx from "clsx";
import SVGIcon from "@/core/icons";

export interface ResetLocationButtonProps {
  onClick: () => void;
}

export const ResetLocationButton = ({ onClick }: ResetLocationButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center gap-2",
        "px-4 py-3",
        "bg-[#EFF9EC] dark:bg-[#292929]",
        "rounded-lg",
        "shadow-md",
        "text-[0.75rem] font-bold",
        "text-[#326C22] dark:text-[#33CC33]",
        "transition-colors cursor-pointer"
      )}
    >
      <SVGIcon
        name="Locate"
        className={clsx("w-3 h-3", "text-[#326C22] dark:text-[#33CC33]")}
      />
      Aktuellen Standort verwenden
    </button>
  );
};

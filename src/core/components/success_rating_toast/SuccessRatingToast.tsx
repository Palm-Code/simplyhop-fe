import clsx from "clsx";

export interface SuccessRatingToastProps {
  message?: string;
}

export const SuccessRatingToast = ({ message }: SuccessRatingToastProps) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        "rounded-xl",
        "px-2 py-2",
        "bg-white dark:bg-[#232323]",
        "text-[#232323] dark:text-white text-sm font-semibold",
        "dark:shadow-[0_5px_25px_0_rgba(35,35,35,0.05)]"
      )}
    >
      {message}
    </div>
  );
};

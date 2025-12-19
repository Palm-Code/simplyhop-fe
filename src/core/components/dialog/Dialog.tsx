import { Dialog as BaseDialog, DialogBackdrop } from "@headlessui/react";
import clsx from "clsx";

export interface DialogProps {
  open?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClose: () => void;
}

export const Dialog = ({
  open = false,
  children,
  className,
  onClose = () => {},
}: DialogProps) => {
  return (
    <BaseDialog open={open} onClose={onClose} className={clsx("relative z-[9999]")}>
      <DialogBackdrop
        className={clsx("fixed inset-0 ", "bg-[#201E2C4D] dark:bg-[#2C2C2CC9]", className)}
      />
      {children}
    </BaseDialog>
  );
};

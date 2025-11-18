import React from "react";
import clsx from "clsx";
import { DialogPanel } from "@headlessui/react";
import { Dialog } from "../dialog/Dialog";

export interface ModalProps {
  open?: boolean;
  children?: React.ReactNode;
  className?: string;
  backdrop?: {
    className: string;
  };
  onClose?: () => void;
}

export const Modal = ({
  open = false,
  children,
  className,
  backdrop = {
    className: "",
  },
  onClose = () => {},
}: ModalProps) => {
  return (
    <Dialog open={open} className={backdrop.className} onClose={onClose}>
      <div
        className={clsx(
          "fixed inset-0",
          "flex items-center justify-center",
          "w-screen",
          "!z-[9998]"
        )}
      >
        <DialogPanel
          className={clsx(
            "w-full",
            "bg-[#FFFFFF] dark:bg-[#232323]",
            "rounded-[1.25rem]",
            "relative",
            className
          )}
        >
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

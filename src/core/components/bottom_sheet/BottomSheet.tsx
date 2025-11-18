import * as React from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

export type BottomSheetDirection = "top" | "bottom" | "left" | "right";

export interface BottomSheetAnimationVariant {
  initial: Record<string, string | number>;
  animate: Record<string, string | number>;
  exit: Record<string, string | number>;
}

export interface BottomSheetProps {
  open?: boolean;
  children?: React.ReactNode;
  direction?: BottomSheetDirection;
  onClose?: () => void;
}

export const BottomSheet = ({
  open = false,
  children,
  direction = "bottom",
  onClose = () => {},
}: BottomSheetProps) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const variants: Record<BottomSheetDirection, BottomSheetAnimationVariant> = {
    top: {
      initial: { y: "-100%" },
      animate: { y: 0 },
      exit: { y: "-100%" },
    },
    bottom: {
      initial: { y: "100%" },
      animate: { y: 0 },
      exit: { y: "100%" },
    },
    left: {
      initial: { x: "-100%" },
      animate: { x: 0 },
      exit: { x: "-100%" },
    },
    right: {
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "100%" },
    },
  };

  const animation = variants[direction];

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={clsx(
            "fixed inset-0 z-[900] flex justify-center items-end"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className={clsx("absolute inset-0 bg-[#E3E3E3]")}
            initial={{ opacity: 0 }}
            animate={{ opacity: "64%" }}
            exit={{ opacity: 0 }}
          />

          {/* Bottom Sheet */}
          <motion.div
            className={clsx(
              "bg-white dark:bg-[#232323] z-[1000]",
              "rounded-tr-[1.25rem] rounded-tl-[1.25rem]",
              "w-full",
              direction === "bottom" && "fixed bottom-0 left-0 right-0",
              direction === "top" && "fixed top-0 left-0 right-0",
              direction === "left" && "fixed top-0 bottom-0 left-0 w-3/4",
              direction === "right" && "fixed top-0 bottom-0 right-0 w-3/4"
            )}
            initial={animation.initial}
            animate={animation.animate}
            exit={animation.exit}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()} // Supaya klik di dalam sheet tidak menutup
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

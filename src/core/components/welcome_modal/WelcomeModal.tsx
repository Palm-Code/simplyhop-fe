"use client";
import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const newUser = localStorage.getItem("new_user");
      if (newUser) {
        setIsOpen(true);
      }
    }
  }, []);

  const handleClose = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("new_user");
      setIsOpen(false);
    }
  };
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className={clsx("z-[999]", "absolute inset-0")}
    >
      {/* Backdrop covers the entire first viewport area */}
      <div
        className="absolute inset-0 bg-[#E3E3E3] opacity-[64%]"
        aria-hidden="true"
      />

      {/* Container positioned within first viewport only */}
      <div className="absolute inset-0 flex items-center justify-center">
        <DialogPanel
          className={clsx(
            "w-full max-w-[523px] mx-auto",
            "bg-white rounded-0 lg:rounded-2xl shadow-2xl",
            "p-4 sm:p-8 lg:p-12",
            "h-screen lg:h-fit overflow-y-auto ios-safari-scroll",
            "grid grid-cols-1 place-content-center place-items-center"
          )}
        >
          {/* Header */}
          <div className="grid grid-cols-1 place-content-center place-items-center gap-[2rem]">
            <img src={"/images/trip/welcome.svg"} />

            <DialogTitle
              as="h1"
              className="text-[2rem] font-bold text-[#292929] text-center"
            >
              Willkommen bei
              <br /> SimplyHop!
            </DialogTitle>

            {/* Content */}

            <p className="text-[1rem] text-[#5B5B5B] text-center">
              Bereit für deine erste Fahrt? Die nächsten Schritte zeigen dir,
              wie du deine Route planst, Fahrer findest und ganz einfach
              loshüpfst. Viel Spaß beim Entdecken – los geht’s!
            </p>

            <button
              className={clsx(
                "flex items-center justify-center",
                "w-full",
                "bg-[#33CC33]",
                "px-[0.75rem] py-[0.75rem]",
                "text-[#232323] text-[1rem] font-semibold",
                "rounded-[6px]"
              )}
              onClick={handleClose}
            >
              {"Jetzt starten"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

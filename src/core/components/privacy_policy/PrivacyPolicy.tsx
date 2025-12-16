import * as React from "react";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";

interface PrivacyPolicyProps {
  privacyLabel: string;
  creditMessage: string;
  logo: {
    src: string | StaticImageData;
    alt: string;
    width: number;
    height: number;
  };
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({
  privacyLabel,
  creditMessage,
  logo,
}) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[1rem]",
        "w-full"
      )}
    >
      <p
        className={clsx(
          "text-[0.75rem] text-[#232323] dark:text-white font-light text-center"
        )}
        dangerouslySetInnerHTML={{
          __html: privacyLabel,
        }}
      />

      <div
        className={clsx(
          "grid grid-flow-col place-content-center place-items-center gap-[0.5rem]"
        )}
      >
        <div className="w-[52px] h-[52px] flex items-center justify-center">
          <Image
            {...logo}
            alt={logo.alt}
            className="w-[52px] h-[52px] object-contain"
          />
        </div>
        <p
          className={clsx(
            "text-[0.75rem] text-[#232323] dark:text-white font-normal text-center"
          )}
          dangerouslySetInnerHTML={{
            __html: creditMessage,
          }}
        />
      </div>
    </div>
  );
};

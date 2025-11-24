import * as React from "react";
import clsx from "clsx";
import { Avatar } from "@/core/components/avatar";
import { UserInformationItem } from "@/core/components/user_information_item";
import SVGIcon from "@/core/icons";

export interface UserInformationCardProps {
  summary: {
    value: string;
    id: string;
    name: string;
  }[];
  header: {
    avatar?: {
      src?: string;
      className?: string;
    };
    displayName: string;
    cta: {
      text: string;
      onClick: () => void;
    };
  };
  detail: {
    email: {
      label: string;
      value: string;
    };

    firstName: {
      label: string;
      value: string;
    };

    lastName: {
      label: string;
      value: string;
    };

    gender: {
      label: string;
      value: string;
    };

    city: {
      label: string;
      value: string;
    };

    phoneNumber: {
      label: string;
      value: string;
    };

    aboutMe: {
      label: string;
      value: string;
    };
  };

  // User Information Fields (dengan structure label + value)

  // Optional styling props
  containerClassName?: string;
}

export const UserInformationCard = ({
  summary = [],
  header: { avatar, displayName, cta },
  detail: { email, firstName, lastName, gender, city, phoneNumber, aboutMe },
  containerClassName,
}: UserInformationCardProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full",
        "px-[1.5rem] py-[1.5rem]",
        "relative",
        "border border-[#D3E7CE]",
        "rounded-[1.25rem]",
        containerClassName
      )}
    >
      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-between justify-items-start gap-[0.5rem]",
          "w-full"
        )}
      >
        <div className={clsx("flex items-center justify-start gap-3")}>
          <Avatar
            src={avatar?.src}
            variant="avatar"
            className={clsx("w-[3rem] h-[3rem]", avatar?.className)}
          />
          <h2 className={clsx("text-[#292929] text-2xl font-bold")}>
            {displayName}
          </h2>
        </div>

        <button
          className={clsx(
            "flex items-center justify-center",
            "bg-white",
            "px-4 py-2",
            "rounded-md",
            "border border-[#33CC33]",
            "text-[#33CC33] text-xs font-semibold"
          )}
          onClick={cta.onClick}
        >
          {cta.text}
        </button>
      </div>

      {/* summary */}
      {!!summary.length && (
        <div
          className={clsx(
            "grid place-content-center place-items-center gap-[0.5rem]",
            "w-full",
            "bg-[white]",
            "px-[0.5rem] py-[0.5rem]",
            "rounded-[0.5rem]"
          )}
          style={{
            gridTemplateColumns: `repeat(${summary.length},1fr)`,
          }}
        >
          {summary.map((item, index) => (
            <div
              key={index}
              className={clsx(
                "grid grid-cols-1 place-content-center place-items-center gap-[0.5rem]",
                "w-full",
                index < summary.length - 1 && "border-r border-r-border-subdued"
              )}
            >
              <p className={clsx("text-[0.75rem] text-[#606060] font-normal")}>
                {item.name}
              </p>
              <div
                className={clsx(
                  "flex items-center justify-center gap-[0.5rem]"
                )}
              >
                {item.id === "ratings" && (
                  <SVGIcon
                    name="Star"
                    className={clsx(
                      "w-[1rem] h-[1rem]",
                      "fill-[#FAC248] text-[#FAC248]"
                    )}
                  />
                )}
                <p className={clsx("text-[0.875rem] text-[#232323] font-bold")}>
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <UserInformationItem name={email.label} value={email.value} />

      <div
        className={clsx(
          "grid grid-cols-1 lg:grid-cols-2 place-content-start place-items-start gap-[1rem]",
          "w-full"
        )}
      >
        <UserInformationItem name={firstName.label} value={firstName.value} />
        <UserInformationItem name={lastName.label} value={lastName.value} />
      </div>

      <UserInformationItem name={gender.label} value={gender.value} />

      <UserInformationItem name={city.label} value={city.value} />

      <UserInformationItem name={phoneNumber.label} value={phoneNumber.value} />

      <UserInformationItem name={aboutMe.label} value={aboutMe.value} />
    </div>
  );
};

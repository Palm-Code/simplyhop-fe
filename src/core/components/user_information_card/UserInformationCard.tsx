import * as React from "react";
import clsx from "clsx";
import Link from "next/link";
import { Avatar } from "@/core/components/avatar";
import { ItemAccountSupport } from "@/features/support/account/components/item";

export interface UserInformationCardProps {
  // Avatar & Header
  avatar?: {
    src?: string;
    className?: string;
  };
  
  displayName: string;
  
  // Edit Button
  editButton: {
    text: string;
    href: string;
  };
  
  // User Information Fields (dengan structure label + value)
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
  
  // Optional styling props
  containerClassName?: string;
}

export const UserInformationCard = ({
  avatar,
  displayName,
  editButton,
  email,
  firstName,
  lastName,
  gender,
  city,
  phoneNumber,
  aboutMe,
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
          <h2 className={clsx("text-[#292929] text-6 font-bold")}>
            {displayName}
          </h2>
        </div>

        <Link href={editButton.href}>
          <button
            className={clsx(
              "flex items-center justify-center",
              "bg-white",
              "px-4 py-2",
              "rounded-md",
              "border border-[#33CC33]",
              "text-[#33CC33] text-xs font-semibold"
            )}
          >
            {editButton.text}
          </button>
        </Link>
      </div>

      <ItemAccountSupport
        name={email.label}
        value={email.value}
      />
      
      <div
        className={clsx(
          "grid grid-cols-1 lg:grid-cols-2 place-content-start place-items-start gap-[1rem]",
          "w-full"
        )}
      >
        <ItemAccountSupport
          name={firstName.label}
          value={firstName.value}
        />
        <ItemAccountSupport
          name={lastName.label}
          value={lastName.value}
        />
      </div>
      
      <ItemAccountSupport
        name={gender.label}
        value={gender.value}
      />
      
      <ItemAccountSupport
        name={city.label}
        value={city.value}
      />
      
      <ItemAccountSupport
        name={phoneNumber.label}
        value={phoneNumber.value}
      />
      
      <ItemAccountSupport
        name={aboutMe.label}
        value={aboutMe.value}
      />
    </div>
  );
};
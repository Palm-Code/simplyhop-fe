import * as React from "react";
import clsx from "clsx";

export interface SettingHeaderProps {
  title?: string;
}

export default function SettingHeader({
  title,
}: SettingHeaderProps) {
  return (
    <h1
      className={clsx("text-[#232323] dark:text-white text-[1.5rem] font-bold")}
    >
      {title}
    </h1>
  );
}

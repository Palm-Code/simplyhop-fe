import * as React from "react";
import clsx from "clsx";
import { FormLoginAuth } from "../fragments/form";

export const LoginAuthContainer = () => {
  return (
    <div
      className={clsx(
        "grid grid-rows-1 grid-cols-1 items-stretch content-between justify-center justify-items-center w-full h-full",
        'py-[80px]'
      )}
    >
      <FormLoginAuth />
    </div>
  );
};

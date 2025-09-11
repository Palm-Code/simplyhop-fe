"use client";
import * as React from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { getDictionaries } from "../../i18n";
import SVGIcon from "@/core/icons";
import { UserContext } from "../../context";

export const FooterApp = () => {
  const { state } = React.useContext(UserContext);
  const dictionaries = getDictionaries();
  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[2rem]",
        "w-full",
        "px-[1rem]"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[2rem]",
          "w-full",
          "max-w-container",
          "py-[60px] lg:py-[5rem]"
        )}
      >
        {/* header */}
        <div
          className={clsx(
            "grid grid-flow-row grid-cols-1 items-start content-start justify-start justify-items-start lg:grid-cols-none lg:grid-flow-col lg:items-center lg:content-center lg:justify-between lg:justify-items-start gap-[1rem]",
            "w-full"
          )}
        >
          <Link href={dictionaries.footer.top.logo.href}>
            <div className="w-[170px] h-[62px] flex items-center justify-center">
              <Image
                {...dictionaries.footer.top.logo.image}
                className={clsx("w-[170px] h-[170px]", "object-contain")}
              />
            </div>
          </Link>

          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-end justify-items-end gap-[1.5rem]"
            )}
          >
            {/* {dictionaries.footer.top.social_media.items.map(
              (item, itemIndex) => (
                <Link
                  key={itemIndex}
                  href={item.href}
                  className={clsx(
                    "flex items-center justify-center",
                    "px-[0.5rem] py-[0.5rem]",
                    "rounded-[0.625rem]",
                    item.id === "facebook" ? "bg-[#EFF9EC]" : "bg-[white]"
                  )}
                >
                  <SVGIcon
                    name={item.icon.name as SVGIconProps["name"]}
                    className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#5B5B5B]")}
                  />
                </Link>
              )
            )} */}
          </div>
        </div>

        {/* link */}
        <div
          className={clsx(
            "grid grid-cols-1 lg:grid-cols-4 place-content-start place-items-start gap-[2.5rem]",
            "w-full"
          )}
        >
          {/* contact center */}
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[2rem]",
              "w-full"
            )}
          >
            {dictionaries.footer.middle.contact_center.items.map(
              (item, itemIndex) => (
                <Link
                  href={item.href}
                  target="_blank"
                  key={itemIndex}
                  className={clsx(
                    "grid grid-flow-col place-content-start place-items-start gap-[0.875rem]"
                  )}
                >
                  <Image
                    src={item.image_url}
                    alt={item.id}
                    className={clsx("w-[2rem] h-[2rem]")}
                    width={32}
                    height={32}
                  />
                  <div
                    className={clsx(
                      "grid grid-col-1 place-content-start place-items-start gap-[0.125rem]"
                    )}
                  >
                    <span
                      className={clsx(
                        "text-[#232323] text-[0.875rem] font-semibold"
                      )}
                    >
                      {item.name}
                    </span>
                    <span
                      className={clsx(
                        "text-[#5B5B5B] text-[0.875rem] font-normal"
                      )}
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>
                </Link>
              )
            )}
          </div>

          {/* function */}
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[2rem]",
              "w-full"
            )}
          >
            <span className={clsx("text-[#232323] text-[1.125rem] font-bold")}>
              {dictionaries.footer.middle.function.title}
            </span>
            <div
              className={clsx(
                "grid grid-col-1 place-content-start place-items-start gap-[1.5rem]"
              )}
            >
              {dictionaries.footer.middle.function.items.map(
                (item, itemIndex) => {
                  const link =
                    item.id === "Mitfahrt suchen"
                      ? item.href
                      : !state.profile
                      ? "/login"
                      : item.href;
                  return (
                    <Link
                      key={itemIndex}
                      href={link}
                      className={clsx(
                        "text-[#5B5B5B] hover:text-green-500 text-[0.875rem] font-normal hover:font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                }
              )}
            </div>
          </div>

          {/* legal */}
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[2rem]",
              "w-full"
            )}
          >
            <span className={clsx("text-[#232323] text-[1.125rem] font-bold")}>
              {dictionaries.footer.middle.legal.title}
            </span>
            <div
              className={clsx(
                "grid grid-col-1 place-content-start place-items-start gap-[1.5rem]"
              )}
            >
              {dictionaries.footer.middle.legal.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  href={item.href}
                  className={clsx(
                    "text-[#5B5B5B] hover:text-green-500 text-[0.875rem] font-normal hover:font-medium"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* eu */}
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[2rem]",
              "w-full"
            )}
          >
            <Image {...dictionaries.eu.image} className={clsx("w-full")} />
          </div>
        </div>

        {/* credit */}
        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
            "w-full"
          )}
        >
          <SVGIcon
            name="Copyright"
            className={clsx("w-[1rem] h-[1rem]", "text-[#5B5B5B]")}
          />
          <span className={clsx("text-[#767676] text-[1rem] font-normal")}>
            {dictionaries.footer.bottom.copyright}
          </span>
        </div>
      </div>
    </div>
  );
};

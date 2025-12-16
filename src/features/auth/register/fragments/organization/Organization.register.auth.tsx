import * as React from "react";
import clsx from "clsx";
import { RegisterAuthActionEnum, RegisterAuthContext } from "../../context";
import { PAGINATION } from "@/core/utils/pagination/contants";
import { LoadingState } from "@/core/components/loading_state";
import { EmptyState } from "@/core/components/empty_state";
import { getDictionaries } from "../../i18n";
import { InfiniteScrollWrapper } from "@/core/components/infinite_scroll_wrapper";
import { ListLoader } from "@/core/components/list_loader";
import { OrganizationCardRegisterAuth } from "../../components/organization_card";
import { Organization } from "@/core/models/data";
import { useGetOrganizationList } from "../../react_query/hooks";
import Link from "next/link";
import { SearchRegisterAuth } from "../search";

export const OrganizationRegisterAuth = () => {
  useGetOrganizationList();
  const { state, dispatch } = React.useContext(RegisterAuthContext);
  const dictionaries = getDictionaries();
  const isLoading = state.organization.loading.is_loading;
  if (
    isLoading &&
    state.organization.pagination.current === PAGINATION.NUMBER
  ) {
    return (
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-4",
          "w-full"
        )}
      >
        <div className={clsx("flex items-center justify-between", "w-full")}>
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-2",
              "w-full"
            )}
          >
            <h1
              className={clsx(
                "text-[#232323] dark:text-[white] text-[1.5rem] font-bold"
              )}
            >
              {dictionaries.organization.title}
            </h1>
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-2",
                "w-full"
              )}
            >
              <div
                className={clsx(
                  "flex items-center justify-start gap-2",
                  "w-full"
                )}
              >
                <span
                  className={clsx(
                    "text-[#5B5B5B] dark:text-[#DADADA] text-base font-normal"
                  )}
                >
                  {dictionaries.organization.login.message}{" "}
                </span>
                <Link
                  href={dictionaries.organization.login.cta.href}
                  className={clsx(
                    "text-[#249124] dark:text-[#33CC33] text-base font-normal underline"
                  )}
                >
                  {dictionaries.organization.login.cta.children}
                </Link>
              </div>
            </div>
          </div>

          <div className={clsx("max-w-[280px]", "w-full")}>
            <SearchRegisterAuth />
          </div>
        </div>

        <div
          className={clsx(
            "grid grid-rows-1 grid-cols-1 place-content-center place-items-center gap-4",
            "w-full h-100"
          )}
        >
          <LoadingState />
        </div>
      </div>
    );
  }
  if (!state.organization.data.length && !isLoading) {
    return (
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-4",
          "w-full"
        )}
      >
        <div className={clsx("flex items-center justify-between", "w-full")}>
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-2",
              "w-full"
            )}
          >
            <h1
              className={clsx(
                "text-[#232323] dark:text-[white] text-[1.5rem] font-bold"
              )}
            >
              {dictionaries.organization.title}
            </h1>
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-2",
                "w-full"
              )}
            >
              <div
                className={clsx(
                  "flex items-center justify-start gap-2",
                  "w-full"
                )}
              >
                <span
                  className={clsx(
                    "text-[#5B5B5B] dark:text-[#DADADA] text-base font-normal"
                  )}
                >
                  {dictionaries.organization.login.message}{" "}
                </span>
                <Link
                  href={dictionaries.organization.login.cta.href}
                  className={clsx(
                    "text-[#249124] dark:text-[#33CC33] text-base font-normal underline"
                  )}
                >
                  {dictionaries.organization.login.cta.children}
                </Link>
              </div>
            </div>
          </div>

          <div className={clsx("max-w-[280px]", "w-full")}>
            <SearchRegisterAuth />
          </div>
        </div>

        <div
          className={clsx(
            "grid grid-rows-1 grid-cols-1 place-content-center place-items-center gap-4",
            "w-full h-100"
          )}
        >
          <EmptyState
            message={dictionaries.organization.list.empty_data.message}
          />
        </div>
      </div>
    );
  }
  const handleLoadMore = () => {
    if (isLoading) return;

    dispatch({
      type: RegisterAuthActionEnum.SetOrganizationPaginationData,
      payload: {
        ...state.organization.pagination,
        current: state.organization.pagination.current + 1,
      },
    });
  };
  const isEndReached =
    state.organization.pagination.last ===
    state.organization.pagination.current;
  const handleClickCTA = (item: Organization) => {
    dispatch({
      type: RegisterAuthActionEnum.SetFormData,
      payload: {
        ...state.form,
        organization: item,
      },
    });
    dispatch({
      type: RegisterAuthActionEnum.SetStepData,
      payload: {
        ...state.step,
        name: "form",
      },
    });
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-4",
        "w-full"
      )}
    >
      <div className={clsx("flex items-center justify-between", "w-full")}>
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-2",
            "w-full"
          )}
        >
          <h1
            className={clsx(
              "text-[#232323] dark:text-[white] text-[1.5rem] font-bold"
            )}
          >
            {dictionaries.organization.title}
          </h1>
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-2",
              "w-full"
            )}
          >
            <div
              className={clsx(
                "flex items-center justify-start gap-2",
                "w-full"
              )}
            >
              <span
                className={clsx(
                  "text-[#5B5B5B] dark:text-[#DADADA] text-base font-normal"
                )}
              >
                {dictionaries.organization.login.message}{" "}
              </span>
              <Link
                href={dictionaries.organization.login.cta.href}
                className={clsx(
                  "text-[#249124] dark:text-[#33CC33] text-base font-normal underline"
                )}
              >
                {dictionaries.organization.login.cta.children}
              </Link>
            </div>
          </div>
        </div>

        <div className={clsx("max-w-[280px]", "w-full")}>
          <SearchRegisterAuth />
        </div>
      </div>

      <InfiniteScrollWrapper
        loader={
          <ListLoader
            message={dictionaries.organization.list.loading.message}
          />
        }
        isPaused={isLoading}
        isEndReached={isEndReached}
        onLoadMore={handleLoadMore}
      >
        <div
          className={clsx(
            "grid grid-rows-1 grid-cols-4 place-content-start place-items-start gap-4",
            "w-full"
          )}
        >
          {state.organization.data.map((item, itemIndex) => {
            const address =
              !item?.address?.length && !item?.address_line_2?.length
                ? "-"
                : !item?.address_line_2?.length
                ? item?.address ?? ""
                : !item?.address?.length
                ? item?.address_line_2 ?? ""
                : `${item?.address} ${item?.address_line_2}`;
            return (
              <OrganizationCardRegisterAuth
                key={itemIndex}
                image={item.logo ?? ""}
                name={item.name}
                address={address}
                cta={{
                  ...dictionaries.organization.card.cta,
                  onClick: () => handleClickCTA(item),
                }}
              />
            );
          })}
        </div>
      </InfiniteScrollWrapper>
    </div>
  );
};

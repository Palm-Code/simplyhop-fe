import * as React from "react";
import { getDictionaries } from "../../i18n";
import { SearchField } from "@/core/components/searchfield";
import { ChatTripActionEnum, ChatTripContext } from "../../context";
import { PAGINATION } from "@/core/utils/pagination/contants";
import { useDebounceValue } from "usehooks-ts";

export const SearchChatTrip = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(ChatTripContext);
  const [value, setValue] = useDebounceValue(state.list.search.value, 500);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  React.useEffect(() => {
    dispatch({
      type: ChatTripActionEnum.SetListData,
      payload: {
        ...state.list,
        search: {
          ...state.list.search,
          value: value,
        },
        message: {
          ...state.list.message,
          items: [],
          pagination: {
            ...state.list.message.pagination,
            current: PAGINATION.NUMBER,
            last: null,
          },
        },
      },
    });
  }, [value]);
  return (
    <SearchField
      labelProps={{ ...dictionaries.search.labelProps }}
      inputProps={{
        ...dictionaries.search.inputProps,
        value: state.list.search.value,
        onChange: handleChangeSearch,
      }}
    />
  );
};

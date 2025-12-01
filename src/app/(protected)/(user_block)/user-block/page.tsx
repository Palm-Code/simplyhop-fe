import { ListUserBlockContainer } from "@/features/user_block/list/container";
import { ListUserBlockProvider } from "@/features/user_block/list/context";

export default function ListUserBlockPage() {
  return (
    <ListUserBlockProvider>
      <ListUserBlockContainer />
    </ListUserBlockProvider>
  );
}

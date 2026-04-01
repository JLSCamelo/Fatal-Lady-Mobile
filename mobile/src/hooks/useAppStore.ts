import { useAppStoreContext } from "../context/AppStore";

export function useAppStore() {
  return useAppStoreContext();
}

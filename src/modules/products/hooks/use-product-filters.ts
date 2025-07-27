import { useQueryStates } from "nuqs";

import { searchParams } from "../search-params";

export const useProductFilters = () => {
  return useQueryStates(searchParams);
};

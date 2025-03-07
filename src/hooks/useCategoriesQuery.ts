import { useQuery } from "@tanstack/react-query";

import { getCategories } from "@/api";

export const useCategoriesQuery = () => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  return { ...query };
};

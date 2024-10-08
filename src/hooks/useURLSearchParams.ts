import { useEffect, useMemo, useState } from "react";

type SearchParams = Record<string, string | undefined>;

export const useURLSearchParams = () => {
  const getSearchParams = () => new URLSearchParams(window.location.search);

  const [searchParams, setSearchParams] = useState(getSearchParams());

  useEffect(() => {
    const handleURLChange = () => setSearchParams(getSearchParams());

    window.addEventListener("popstate", handleURLChange);

    return () => window.removeEventListener("popstate", handleURLChange);
  }, []);

  const updateSearchParams = (newParams: Partial<SearchParams>) => {
    const currentParams = getSearchParams();

    Object.keys(newParams).forEach((key) => {
      if (
        newParams[key] === null ||
        newParams[key] === undefined ||
        newParams[key] === ""
      ) {
        currentParams.delete(key);
      } else {
        currentParams.set(key, newParams[key]);
      }
    });

    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;

    window.history.pushState({}, "", newUrl);

    setSearchParams(getSearchParams());
  };

  const searchParamsObject = useMemo(() => {
    const params: SearchParams = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  }, [searchParams]);

  return {
    searchParams: searchParamsObject,
    setSearchParams: updateSearchParams,
  };
};

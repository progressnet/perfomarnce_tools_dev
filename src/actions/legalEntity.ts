import useSWR from "swr";
import {useMemo} from "react";

import {fetcher,endpoints} from "../utils/axios";

import type {ApiData} from "./_types";

const enableServer = false;
const swrOptions = {
  revalidateIfStale: enableServer,
  revalidateOnFocus: enableServer,
  revalidateOnReconnect: enableServer,
};


type EventsData = {
  code: string;
  city: string;
  country: string;
  currency: string;
};


const ENDPOINT = endpoints.legalEntity

export function useGetLegalEntity() {
  const { data, isLoading, error, isValidating } = useSWR<ApiData<EventsData>>(
    ENDPOINT,
    fetcher,
    swrOptions
  );

  return useMemo(() => ({
    entities: data?.data || [],
    isLoading,
    error,
    isValidating,
    empty: !isLoading && !data?.data?.length,
  }), [data, error, isLoading, isValidating]);
}






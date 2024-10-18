import useSWR from "swr";
import {useMemo} from "react";

import {fetcher,endpoints} from "../utils/axios";

const enableServer = false;
const swrOptions = {
  revalidateIfStale: enableServer,
  revalidateOnFocus: enableServer,
  revalidateOnReconnect: enableServer,
};


type ApiProps = {
  email: string;
};


const ENDPOINT = endpoints.auth.email

export function useGetAuthEmail(encryptedEmail: string | null) {
  const { data, isLoading, error, isValidating } = useSWR<ApiProps>(
    encryptedEmail ? ENDPOINT.concat(`?email=${encryptedEmail}`) : null,
    fetcher,
    swrOptions
  );

  return useMemo(() => ({
    email: data || [],
    isLoading,
    error,
    isValidating,
  }), [data, error, isLoading, isValidating]);
}




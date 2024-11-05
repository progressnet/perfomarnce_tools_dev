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
  id: number;
  subProcess: string;
  process: string;
};




const ENDPOINT_BY_PROCESS = endpoints.subprocessByProcess

export function useGetSubProcessByProcess(id: number | null) {
  const { data, isLoading, error, isValidating } = useSWR<ApiData<EventsData>>(
    id ? ENDPOINT_BY_PROCESS.concat(`/${id}`) : null,
    fetcher,
    swrOptions
  );

  return useMemo(() => ({
    subprocesses: data?.data || [],
    isLoading,
    error,
    isValidating,
    empty: !isLoading && !data?.data.length,
  }), [data, error, isLoading, isValidating]);
}


const PROCESSES = [
  {
    id: 1,
    subProcessName: 'sub Process 1',
    notStarted: 10,
    ongoing: 1,
    completed: 2,
  }, {
    id: 2,
    subProcessName: 'sub Process 2',
    notStarted: 10,
    ongoing: 1,
    completed: 2,
  },
  {
    id: 3,
    subProcessName: 'sub Process 3',
    notStarted: 10,
    ongoing: 1,
    completed: 2,
  },
 {
   id: 4,
   subProcessName: 'sub Process 4',
   notStarted: 10,
   ongoing: 1,
   completed: 2,
  },{
    id: 5,
    subProcessName: 'sub Process 5',
    notStarted: 10,
    ongoing: 1,
    completed: 2,
  },{
    id: 6,
    subProcessName: 'sub Process 6',
    notStarted: 10,
    ongoing: 1,
    completed: 2,
  },{
    id: 7,
    subProcessName: 'sub Process 7',
    notStarted: 10,
    ongoing: 1,
    completed: 2,
  },
]


export function useGetMyTasksSubProcesses(id: number | null) {
  return {
    subProcesses: PROCESSES,
  }
}

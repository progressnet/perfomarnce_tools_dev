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
  processName: string;
  department: string;
};


const ENDPOINT = endpoints.process

export function useGetProcess() {
  const { data, isLoading, error, isValidating } = useSWR<ApiData<EventsData>>(
    ENDPOINT,
    fetcher,
    swrOptions
  );

  return useMemo(() => ({
      processes: data?.data || [],
      isLoading,
      error,
      isValidating,
     empty: !isLoading && !data?.data.length,
    }), [data, error, isLoading, isValidating]);
}

const PROCESSES = [
  {
    id: 1,
    processName: 'Process 1',
    subProcesses: 10,
    tasks: 20,
    done: 2,
  }, {
    id: 2,
    processName: 'Closing Process',
    subProcesses: 5,
    tasks: 10,
    done: 4,
  },
  {
    id: 3,
    processName: 'Process 3',
    subProcesses: 5,
    tasks: 10,
    done: 4,
  },{
    id: 4,
    processName: 'Process 4',
    subProcesses: 5,
    tasks: 10,
    done: 4,
  },{
    id: 5,
    processName: 'Process 5',
    subProcesses: 5,
    tasks: 10,
    done: 4,
  },{
    id: 6,
    processName: 'Process 6',
    subProcesses: 5,
    tasks: 10,
    done: 4,
  },{
    id: 7,
    processName: 'Process 7',
    subProcesses: 5,
    tasks: 10,
    done: 4,
  },{
    id: 8,
    processName: 'Process 8',
    subProcesses: 5,
    tasks: 10,
    done: 4,
  },
]


export function useGetMyTasksProcesses() {
  return {
    processes: PROCESSES,
  }
}

import type {ICalendarEvent} from 'src/types/calendar';

import {useMemo} from 'react';
import useSWR, {mutate} from 'swr';

import axios, {fetcher} from 'src/utils/axios';

// ----------------------------------------------------------------------

const enableServer = false;

// const CALENDAR_ENDPOINT = endpoints.calendar;
const CALENDAR_ENDPOINT = "https://mocki.io/v1/0d9a8b7e-9d69-48f4-b325-055d8087b14c";

const swrOptions = {
  revalidateIfStale: enableServer,
  revalidateOnFocus: enableServer,
  revalidateOnReconnect: enableServer,
};

// ----------------------------------------------------------------------

type EventsData = {
    id: number;
    process: {
      id: string;
      title: string;
    };
    subprocess: {
      id: string;
      title: string;
    };
    hours: number,
    task: string;
    start_date: string;
    end_date: string;
    color: string;
};

type HoursPerDay = {
  [key: string]: number;
}

const calculateTotalHoursPerDay = (events: EventsData[]) => {

  const hoursPerDay: HoursPerDay = {};
  events.forEach((event) => {
    if(!hoursPerDay[event.start_date]){
      hoursPerDay[event.start_date] = 0;
    }
    hoursPerDay[event.start_date] += event.hours;
  })
  return hoursPerDay;
}

export function useGetEvents() {
  const { data, isLoading, error, isValidating } = useSWR<EventsData[]>(
    CALENDAR_ENDPOINT,
    fetcher,
    swrOptions
  );


  return useMemo(() => {
    const totalHoursPerDay = calculateTotalHoursPerDay(data || []);

    const events = data?.map((event) => {

      const dayHours = totalHoursPerDay[event.start_date];
      const title =  event.task;

      return {
        id: event.id.toString(),
        title: `${title} - ${event.hours}h`,
        start: event.start_date,
        end: event.start_date,
        color: dayHours >= 8 ? "green" : "red",
        extendedProps: {
          process: event.process,
          subprocess: event.subprocess,
          hours: event.hours,
          task: event.task,
        },
      }
    });

    return {
      events: events || [],
      eventsLoading: isLoading,
      eventsError: error,
      eventsValidating: isValidating,
      eventsEmpty: !isLoading && !data?.length,
    };
  }, [data, error, isLoading, isValidating]);
}

// ----------------------------------------------------------------------

export async function createEvent(eventData: ICalendarEvent) {
  /**
   * Work on server
   */
  if (enableServer) {
    const data = { eventData };
    await axios.post(CALENDAR_ENDPOINT, data);
  }

  /**
   * Work in local
   */
  await mutate(
    CALENDAR_ENDPOINT,
    (currentData: any) => {
      const currentEvents: ICalendarEvent[] = currentData?.events;

      const events = [...currentEvents, eventData];

      return { ...currentData, events };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function updateEvent(eventData: Partial<ICalendarEvent>) {
  /**
   * Work on server
   */
  if (enableServer) {
    const data = { eventData };
    await axios.put(CALENDAR_ENDPOINT, data);
  }

  /**
   * Work in local
   */
 await mutate(
    CALENDAR_ENDPOINT,
    (currentData: any) => {
      const currentEvents: ICalendarEvent[] = currentData?.events;

      const events = currentEvents.map((event) =>
        event.id === eventData.id ? { ...event, ...eventData } : event
      );

      return { ...currentData, events };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function deleteEvent(eventId: string) {
  /**
   * Work on server
   */
  if (enableServer) {
    const data = { eventId };
    await axios.patch(CALENDAR_ENDPOINT, data);
  }

  /**
   * Work in local
   */
 await mutate(
    CALENDAR_ENDPOINT,
    (currentData: any) => {
      const currentEvents: ICalendarEvent[] = currentData?.events;

      const events = currentEvents.filter((event) => event.id !== eventId);

      return { ...currentData, events };
    },
    false
  );
}




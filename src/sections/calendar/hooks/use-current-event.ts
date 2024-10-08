import type { ICalendarEvent, } from 'src/types/calendar';

import {useEffect, useMemo, useState} from 'react';


// ----------------------------------------------------------------------

export function useCurrentEvent(
  events: ICalendarEvent[],
  selectID?: string | null,
  openForm?: boolean
) {


  const [currentEvent, setCurrentEvent] = useState<ICalendarEvent | null>(null);
  useEffect(() => {
    if(!events.length || !openForm ) return;
    const find = events.find((event) => event.id === selectID);
    setCurrentEvent(find || null);

  }, [events, openForm, selectID])

  return useMemo(() => ({
    currentEvent,
    setCurrentEvent
  }), [currentEvent, setCurrentEvent]);

}

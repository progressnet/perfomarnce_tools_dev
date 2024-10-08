import { create } from 'zustand';

import type { ICalendarEvent } from "../types/calendar";

interface CalendarStoreState {
  currentEvent: ICalendarEvent | null;
  setCurrentEvent: (event: ICalendarEvent) => void;
  clearCurrentEvent: () => void;
  activeEvent: ICalendarEvent | null;
  clickedDate: string | null;
  setActiveEvent: (event: ICalendarEvent | null) => void;
  handleDayPress: (date: string) => void;
  setClickedDate: (date: string) => void;
}

const useCalendarStore = create<CalendarStoreState>((set) => ({
  clickedDate: null,
  currentEvent: null,
  setCurrentEvent: (event: ICalendarEvent) => set({ currentEvent: event }),
  clearCurrentEvent: () => set({ currentEvent: null }),
  // ------------------------------------------------
  activeEvent: null,
  setActiveEvent: (event: ICalendarEvent | null) => set({ activeEvent: event }),
  setClickedDate: (date: string) => set({ clickedDate: date }),
  handleDayPress: (date: string) => set({ clickedDate: date, activeEvent: null, currentEvent: null }),
}));

export default useCalendarStore;

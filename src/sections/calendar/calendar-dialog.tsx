import type { ICalendarEvent } from "src/types/calendar";

import dayjs from "dayjs";
import { useCallback } from "react";
import { useShallow } from "zustand/shallow";

import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
import {Stack, IconButton, Typography} from "@mui/material";

import { CalendarForm } from "./calendar-form";
import { Iconify } from "../../components/iconify";
import { Scrollbar } from "../../components/scrollbar";
import useCalendarStore, { type CalendarStoreState } from "../../store/calendarStore";

type DialogProps = {
  events: ICalendarEvent[];
  onCloseForm: () => void;
  openForm: boolean;
  URL: string;
};

export const CalendarDialog = (
  {
    events,
    onCloseForm,
    openForm,
    URL,
  }: DialogProps) => {
  const theme = useTheme();

  const { clearCurrentEvent, setActiveEvent, clickedDate } = useCalendarStore(
    useShallow((state: CalendarStoreState) => ({
      currentEvent: state.currentEvent,
      clickedDate: state.clickedDate,
      clearCurrentEvent: state.clearCurrentEvent,
      setActiveEvent: state.setActiveEvent,
    }))
  );

  const stringDate = dayjs(clickedDate).format('D MMMM YYYY'); // "2 October 2024"

  const handleAddNewTask = () => {
    setActiveEvent(null);
    clearCurrentEvent();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={openForm}
      onClose={onCloseForm}
      transitionDuration={{
        enter: theme.transitions.duration.shortest,
        exit: theme.transitions.duration.shortest - 80,
      }}
      PaperProps={{
        sx: {
          minHeight: '300px',
          height: '85vh',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          flexDirection: 'column',
        },
      }}
    >
      <Stack
        spacing={1}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          '@media (max-width: 600px)': {
            flexDirection: 'column'
          },
          height: '100%',
          padding: '12px',
          backgroundColor: 'rgba(246,246,246,0.99)',
          borderRadius: '15px',
          overflow: 'hidden',
        }}
      >
        {/* LEFT SIDE (Event List) */}
        <Stack
          sx={{
            '@media (max-width: 600px)': {
              display: 'none'
            },
            maxWidth: '300px',
            flex: 1,
            backgroundColor: '#fbfbfb',
            borderRadius: 1,
            boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',

          }}
        >
          <Stack
            alignItems="flex-end"
            justifyContent="center"
            sx={{
              height: '80px',
              minHeight: '80px',
              paddingX: 2,
              borderBottom: '1px dashed',
              borderColor: 'grey.300',
            }}
          >
            {/* NEW TASK BUTTON */}
            <AddTaskBtn onClick={handleAddNewTask} />
          </Stack>
            {/* LIST OF CURRENT EVENTS */}
            <ListOfCurrentEvents events={events} />
        </Stack>

        {/* RIGHT SIDE (Form) */}
        <Stack
          sx={{
            overflow: 'hidden',
            flex: 2,
            backgroundColor: '#fff',
            borderRadius: 1,
            boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              minHeight: '80px',
              paddingX: 3,
              borderBottom: '1px dashed',
              borderColor: 'grey.300',
            }}
          >
            <Typography sx={{fontWeight: 'bold', fontSize: '18px'}}>{stringDate}</Typography>
            <IconButton aria-label="close" onClick={onCloseForm}>
              <Iconify icon="material-symbols:close" sx={{ width: 25, height: 25 }} />
            </IconButton>
          </Stack>

          <Scrollbar
            sx={{
              padding: 2,
              paddingX: 3,
              overflowY: 'auto',
            }}
          >
            <CalendarForm URL={URL} events={events} onClose={onCloseForm} />
          </Scrollbar>
        </Stack>
      </Stack>
    </Dialog>
  );
};

type ListOfCurrentEventsProps = {
  events: ICalendarEvent[];
};

const ListOfCurrentEvents = ({ events }: ListOfCurrentEventsProps) => {
  const initialTime = 0;
  const time = events.reduce((acc, event) => {
    if (!event.extendedProps.clickable) return acc;
    return acc + event.extendedProps.hours;
  }, initialTime);

  const color = time >= 8 ? 'green' : 'red';

  return (
    <Stack sx={{ height: '100%', overflow:'hidden' }}>
      <Stack sx={{padding: 2}}>
        <Typography sx={{ fontSize: '14px' }} color={color}>
          {time} out of 8 hours have been added
        </Typography>
      </Stack>
      <Scrollbar
        sx={{
          flex: 1,
          overflowY: 'auto',
          maxHeight: '100%',
          '@media (max-width: 600px)': {
            maxHeight: '108px',
          },
        }}
      >
      {events.map((event) => {
        if (!event.extendedProps.clickable) return null;
        return <EventListItem key={event.id} event={event} />;
      })}
      </Scrollbar>
    </Stack>
  );
};

type EventListItemProps = {
  event: ICalendarEvent;
};

export function EventListItem({ event }: EventListItemProps) {
  const activeEvent = useCalendarStore((state) => state.activeEvent);
  const setActiveEvent = useCalendarStore((state) => state.setActiveEvent);
  const setCurrentEvent = useCalendarStore((state) => state.setCurrentEvent);

  const condition = activeEvent?.id === event.id;

  const handleActive = useCallback(() => {
    setActiveEvent(event);
    setCurrentEvent(event);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  return (
    <Stack
      onClick={handleActive}
      sx={{
        marginBottom: 0.5,
        cursor: 'pointer',
        padding: 1,
        minHeight: '100px',
        border: '1px solid transparent',
        borderLeft: '6px solid transparent',
        ...(condition && {
          borderColor: 'blue',
        }),
        overflow: 'hidden',
      }}
      direction="row"
      alignItems="center"
    >
      <Stack sx={{ width: '100%' }}>
        <Typography sx={{ width: '200px', lineHeight: 1.2, mb: 0.4 }} variant="subtitle2">
          {event.extendedProps?.taskName}
        </Typography>
        <Typography sx={{ width: '200px' }} variant="caption" color="primary">
          {event.extendedProps?.subprocessName}
        </Typography>
        <Typography sx={{ width: '200px', marginTop: 1 }} variant="subtitle2" color="primary">
          {`${event.extendedProps?.hours} hours`}
        </Typography>
      </Stack>
      <IconButton>
        <Iconify icon="mingcute:right-fill" sx={{ width: 18, height: 18 }} />
      </IconButton>
    </Stack>
  );
}

type AddTaskBtnProps = {
  onClick: () => void;
};

const AddTaskBtn = ({ onClick }: AddTaskBtnProps) => (
  <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
    <Typography>Add New Task</Typography>
    <IconButton
      onClick={onClick}
      size="small"
      aria-label="new task"
      sx={{
        width: '25px',
        height: '25px',
        backgroundColor: 'primary.main',
        color: '#fff',
      }}
    >
      <Iconify icon="mdi:plus" sx={{ width: 25, height: 25 }} />
    </IconButton>
  </Stack>
);

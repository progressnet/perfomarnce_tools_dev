import type {ICalendarEvent} from "src/types/calendar";

import {useCallback, useEffect, useState} from "react";

import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import {useTheme} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import {Iconify} from "../../components/iconify";
import {CalendarForm} from "./calendar-form";
import {Scrollbar} from "../../components/scrollbar";

type DialogProps = {
  events: ICalendarEvent[];
  currentEvent: ICalendarEvent;
  onCloseForm: () => void;
  openForm: boolean;
};

export const CalendarDialog = (
  {
    events,
    currentEvent,
    onCloseForm,
    openForm,
  }: DialogProps) => {
  const theme = useTheme();

  const [eventActive, setEventActive] = useState<ICalendarEvent>();


  useEffect(() => {
    if(!currentEvent) return;
    setEventActive(currentEvent)
  }, [currentEvent])


  const handleAddNewTask = () => {
    console.log('add new task')
  }
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
          minHeight:'300px',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          flexDirection: 'column',
        },
      }}
    >
      <Scrollbar fillContent>
        <Stack
          flexDirection={{ xs: 'column', md: 'row' }} // 'column' for mobile, 'row' for desktop
          spacing={1}
          sx={{
            flexGrow: 1,
            padding: '12px',
            backgroundColor: 'rgba(246,246,246,0.99)',
            borderRadius: '15px',
          }}
        >
          {/* LEFT SIDE */}
          <Stack sx={{
            flex: 1,
            backgroundColor: '#fbfbfb',
            borderRadius: 1,
            boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.1)',

          }}
          >
            <Stack
              alignItems="flex-end"
              justifyContent="center"
              sx={{
                height: '80px',
                p:2,
                borderBottom: '1px dashed',
                borderColor: 'grey.300',
              }}
            >
              {/* NEW TASK */}
              <AddTaskBtn onClick={handleAddNewTask} />
            </Stack>
            <Stack >
              {/* DISPLAY LIST OF CURRENT TASKS */}
              <ListOfCurrentEvents
                eventActive={eventActive}
                events={events}
                setEventActive={setEventActive}
              />
            </Stack>
          </Stack>
          {/* RIGHT SIDE */}
          <Stack
            sx={{
              flex: 2,
              backgroundColor: '#fff',
              borderRadius: 1,
              boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.1)'
            }}
          >
            <Stack sx={{
              height: '80px',
              p:1,
              borderBottom: '1px dashed',
              borderColor: 'grey.300',
              alignItems: 'flex-end',
              justifyContent: 'center'
            }}
            >
              <IconButton
                aria-label="close"
                onClick={onCloseForm}
              >
                <Iconify icon="material-symbols:close" sx={{width: 25, height: 25,}} />
              </IconButton>
            </Stack>
            <Stack
              sx={{padding: 2, paddingX: 3}}
            >
              <CalendarForm
                currentEvent={eventActive}
                onClose={onCloseForm}
              />
            </Stack>
          </Stack>
        </Stack>
      </Scrollbar>

    </Dialog>
  )
}


type ListOfCurrentEventsProps = {
  events: ICalendarEvent[];
  eventActive: ICalendarEvent | undefined;
  setEventActive: (event: ICalendarEvent) => void;
}


const ListOfCurrentEvents = ({events, eventActive, setEventActive}: ListOfCurrentEventsProps) => {
  const initialTime = 0;
  const time = events.reduce((acc, event) => acc + event.extendedProps.hours, initialTime)
  const color = time >= 8 ? 'green' : 'red';
  return (
    <Stack>
      <Stack
        sx={{p: 2}}
      >
        <Typography  sx={{fontSize: '14px'}} color={color}>
          {time} out of 8 hours have been added
        </Typography>
      </Stack>
      <Stack sx={{overflow: 'auto'}} spacing={2}>
        {events.map((event) => (
          <EventListItem
            eventActive={eventActive}
            event={event}
            key={event.id}
            setEventActive={setEventActive}
          />
        ))}
      </Stack>
    </Stack>

  )
}


type EventListItemProps = {
  event: ICalendarEvent;
  eventActive: ICalendarEvent | undefined;
  setEventActive: (event: ICalendarEvent) => void;
}

export function EventListItem(
  {
    event,
    eventActive,
    setEventActive
  }: EventListItemProps)  {


  const condition = eventActive?.id === event.id;


  const handleActive = useCallback(() => {
    setEventActive(event)
  }, [event, setEventActive])


  return (
    <Stack
      onClick={handleActive}
      sx={{
        cursor: 'pointer',
        padding: 1,
        border: `1px solid transparent`,
        borderLeft: '6px solid transparent',
        ...(condition && {
          borderColor: 'blue',
        }),
        overflow: 'hidden',
      }}
      flexDirection="row"
        alignItems="center"
        >
      <Stack sx={{ width: '100%'}}>
        <Typography sx={{width: '200px', textWrap: 'wrap', lineHeight: 1.2, mb: 0.4}} variant="subtitle2">
          {event.extendedProps?.taskName}
        </Typography >
        <Typography sx={{width: '200px', textWrap: 'wrap'}} variant="caption" color="primary">
          {event.extendedProps?.subprocessName}
        </Typography >
        <Typography sx={{width: '200px', textWrap: 'wrap', marginTop: 1}} variant="subtitle2" color="primary">
          {`${event.extendedProps?.hours  } hours`}
        </Typography >
      </Stack>
      <Stack sx={{width: '40px'}}>
        <IconButton>
          <Iconify icon="mingcute:right-fill" sx={{width: 18, height: 18,}} />
        </IconButton>
      </Stack>
    </Stack>
  )
}

type AddTaskBtnProps = {
  onClick: () => void;

}


// --- ADD NEW TASK BUTTON:
const AddTaskBtn = ({onClick}: AddTaskBtnProps) => (
  <Stack  flexDirection="row" spacing={1} justifyContent="flex-end" alignItems="center">
    <Typography>
      Add New Task
    </Typography>
    <IconButton

      onClick={onClick}
      size="small"
      aria-label="new task"
      sx={{
        width: '25px',
        height: '25px',
        backgroundColor: 'primary.main',
        color: '#fff'
      }}
    >
      <Iconify icon="mdi:plus" sx={{width: 25, height: 25,}} />
    </IconButton>
  </Stack>
)


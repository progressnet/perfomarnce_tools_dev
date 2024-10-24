import type {ReactNode} from "react";
import type { ICalendarEvent } from 'src/types/calendar';

import dayjs from "dayjs";
import {toast} from "sonner";
import { z as zod} from 'zod';
import { useForm } from 'react-hook-form';
import { useShallow} from 'zustand/shallow'
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useEffect, useCallback} from "react";

import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Radio from "@mui/material/Radio";
import Button from '@mui/material/Button';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from "@mui/material/FormControl";
import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from "@mui/material/FormControlLabel";

import { Form, Field } from 'src/components/hook-form';

import useCalendarStore from "../../store/calendarStore";
import {handleTimesheetCreate, handleTimesheetUpdate} from "../../actions/calendar";

import type {CalendarStoreState} from "../../store/calendarStore";


// ----------------------------------------------------------------------
type Event = {
  timesheetdate: string;
  process: {
    id: number | null;
    name: string | null;
  };
  subprocess: {
    id: number | null;
    name: string | null;
  };
  task: {
    id: number | null;
    name: string | null;
  };
  hours: number | null;
  exists: boolean;
  isCompleted: boolean;
};
export type EventSchemaType = zod.infer<typeof EventSchema>;

export const EventSchema = zod.object({
  process: zod.object({
    id: zod.number().nullable(),
    name: zod.string().nullable(),
  }).refine((value) => value.id !== null && value.name !== null, {
    message: 'Process is required',
  }),
  subprocess: zod.object({
    id: zod.number().nullable(),
    name: zod.string().nullable(),
  }).refine((value) => value.id !== null && value.name !== null, {
    message: 'Sub-process is required',
  }),
  task: zod.object({
    id: zod.number().nullable(),
    name: zod.string().nullable(),
  }).refine((value) => value.id !== null && value.name !== null, {
    message: 'Task is required',
  }),
  exists: zod.boolean().optional(),
  hours: zod.number().nullable().refine((value) => value !== null &&  value > 0, {
    message: 'Hours is a required and must be greater than 0',
  }),
  isCompleted: zod.boolean().nullable().refine((value) => value !== null, {
    message: 'Is completed is required',
  })
})

// ----------------------------------------------------------------------

type Props = {
  onClose: () => void;
  events: ICalendarEvent[];
  URL: string;

};

export function CalendarForm(
  {
    URL,
    events,
    onClose,
  }: Props) {

  const {
    currentEvent,
    setCurrentEvent,
    setActiveEvent,
    clickedDate,
  } = useCalendarStore(useShallow((state:CalendarStoreState) => ({
    currentEvent: state.currentEvent,
    setCurrentEvent: state.setCurrentEvent,
    setActiveEvent: state.setActiveEvent,
    clickedDate: state.clickedDate,
  })));
  const stringDateVariant = dayjs(clickedDate).format('MMMM D YYYY');

  const defaultValues = useMemo(
    () => ({
      process: {
        id: currentEvent?.extendedProps?.processID || null,
        name: currentEvent?.extendedProps?.processName || null,
      },
      subprocess: {
        id: currentEvent?.extendedProps?.subprocessID || null,
        name: currentEvent?.extendedProps?.subprocessName || null,
      },
      task: {
        id: currentEvent?.extendedProps?.taskID || null,
        name: currentEvent?.extendedProps?.taskName || null,
      },
      timesheetID: currentEvent?.extendedProps.timesheetID,
      hours: currentEvent?.extendedProps?.hours || 0,
      isCompleted: currentEvent?.extendedProps?.isCompleted ?? null,
      exists: false,
    }),
    [currentEvent]
  );

  const methods = useForm< Event >({
    mode: 'all',
    resolver: zodResolver(EventSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;
  const values = watch();

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, currentEvent, reset]);


  const onSubmit = handleSubmit(async (submitData) => {

    if (!submitData.hours || !submitData.task?.id ) return;

    const processedData = {
      timesheetdate: dayjs(clickedDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      hours: submitData.hours,
      taskID: submitData.task.id,
      isCompleted: submitData.isCompleted,
    };


    const isEdit = Boolean(currentEvent?.id);
    const exists = events.find(item => item.extendedProps.taskID === values.task.id);
    try {
      if ( isEdit || exists) {
        // Update existing timesheet
         await handleTimesheetUpdate({
          ...processedData,
          id: isEdit ? Number(currentEvent?.id) : Number(exists?.id),
        }, URL);
          toast.success('Timesheet updated successfully');
      } else {
        // Create new timesheet
        await handleTimesheetCreate(processedData, URL);
        toast.success('Timesheet created successfully');
      }
      onClose();
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    }
  });


  const resetToDefault = {
    id: null,
    name: null
  }

  const handleProcessChange = useCallback((value: {id: number | null, name: string | null}) => {
      setValue('process', value)
      setValue('subprocess',resetToDefault)
      setValue('task', resetToDefault)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue])

  const handleSubProcessChange = useCallback((value: {id: number | null, name: string | null}) => {
      setValue('subprocess', value)
      setValue('task', resetToDefault)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue])

  const handleTaskChange = useCallback((value: {id: number | null, name: string | null}) => {

    const exists = events.find(item => item.extendedProps.taskID === value.id);
    if(exists) {
      setCurrentEvent(exists as ICalendarEvent);
    } else {
      setActiveEvent(null)
    }
    setValue('task', value)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue])

  const handleHourChange = useCallback((hourVal: number | null) => {
      setValue('hours', hourVal)
  }, [setValue]);

  const handleIsCompleted = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === 'true';
    setValue('isCompleted', value)
  }, [setValue]);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2}>
        { /* ============== PROCESS ================ */}
        <HorizontalInputContainer label="Process">
          <Field.SelectProcess
            name="process"
            error={errors?.process?.message || ""}
            label="Process"
            value={values.process.id}
            handleValue={handleProcessChange}
          />
        </HorizontalInputContainer>
        { /* ============== SUB-PROCESS ================ */}
         <HorizontalInputContainer label="Sub-process">
           <Field.SelectSubProcess
            processID={values.process?.id}
            name="subprocess"
            error={errors?.subprocess?.message || ""}
            label="Sub-process"
            value={values.subprocess?.id}
            handleValue={handleSubProcessChange}
           />
         </HorizontalInputContainer>
        { /* ============== TASK ================ */}
          <Typography
            sx={{
              mb:1,
              '@media (max-width: 897px)': {
                fontSize: '0.92rem'
              },
          }}
            variant="h6"
          >
            Choose the task that you have been working on
          </Typography>
          <Grid spacing={0} container justifyContent="end">
            <Grid alignContent="center" item xs={4}
              sx={{
                '@media (max-width: 897px)': {
                  display: 'none',
                },
              }}
            >
              <Typography variant="body2" sx={{fontWeight: 'medium'}}>Task</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
               <Field.SelectTask
                subprocessID={values?.subprocess?.id}
                name="task"
                error={errors?.task?.message || ""}
                label="Task"
                value={values?.task?.id}
                handleValue={handleTaskChange}
               />
            </Grid>
            { /* ============== TEXT DISPLAY ================ */}
            <Grid item xs={12} md={8} >
              {values.process?.name && values.subprocess?.name && values.task?.name ? (
                <SelectedValues
                  processName={values?.process?.name}
                  subprocessName={values?.subprocess?.name}
                  taskName={values?.task?.name}
                />
              ): null}
            </Grid>
            <Grid item xs={8}>
              {values.exists && (
                <Box  component="p" sx={{fontSize: '12px', margin: 0, marginTop: 1}}>
                  You have already worked on this task. You are now updating the hours.
                </Box>
              )}
            </Grid>
          </Grid>
          <Divider sx={{borderStyle:'dashed', color: '#000'}} variant="fullWidth" />
        <Stack spacing={1}>
          { /* ============== HOURS CONTROLLER ================ */}
          <HoursController
            value={values.hours}
            increment={0.5}
            handleValue={handleHourChange}
            error={errors?.hours?.message || ""}
            date={stringDateVariant}
          />
        </Stack>
        { /* ============== IS COMPLETED  ================ */}
           <RadioCompletionButtons
            value={values.isCompleted}
            handleChange={handleIsCompleted}
            error={errors?.isCompleted?.message || ""}
           />
        </Stack>
      { /* ============== DIALOG ACTIONS ================ */}
      <DialogActions
        sx={{ flexShrink: 0 }}
      >
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Save changes
        </LoadingButton>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Form>
  );
}


type SelectedValuesProps = {
  processName: string | null;
  subprocessName:string | null;
  taskName:string | null;
}


// ============== SELECTION TEXT DISPLAY ================
const SelectedValues = ({processName, subprocessName, taskName}: SelectedValuesProps) => (
    <Stack flexDirection="row" sx={{minHeight: 70,   width: '100%'}}>
      <Box sx={{fontSize: '12px', marginBottom: 0, width: '100%'}} component="p">
        You have selected the task:
        <Box component="span"  sx={{color: "primary.main"}}> {taskName} </Box>
        from the sub-process:
        <Box component="span" sx={{color: "primary.main"}}> {subprocessName} </Box>
        of
        <Box component="span"  sx={{color: "primary.main"}}> {processName}</Box>
      </Box>
    </Stack>
  )

// ============== GRID CONTAINER FOR PROCESS / SUBPROCESS / TASK ================
export type HorizontalInputProps = {
  children: ReactNode;
  label: string;
}

export const HorizontalInputContainer = ({children, label}:  HorizontalInputProps) => (
  <Grid container sx={{
    width: '100%',
    alignItems: 'space-between',
  }}>
    <Grid item xs={4}   sx={{
      '@media (max-width: 897px)': {
        display: 'none',
      },
    }}>
      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>{label}</Typography>
    </Grid>

    <Grid item md={8} xs={12} sx={{
      width: { xs: '100%' }, // take full width on xs screens
    }}>
      {children}
    </Grid>
  </Grid>
  )


// ============== HOURS CONTROLLER ================

export type HoursControllerProps = {
  value: number | null;
  handleValue: (value: number | null) => void;
  error: string;
  date: string;
  increment: number;
}
export const HoursController = (
  {
    value,
    handleValue,
    error,
    date,
    increment,
  }: HoursControllerProps) => (
    <Stack>
      <Stack
        flexDirection="row"
        alignItems="center"
        spacing={3}
        sx={{
          '@media (max-width: 897px)': {
            flexDirection: 'column',
            alignItems: 'flex-start'
          }
        }}
      >
        <Typography
          sx={{
            '@media (max-width: 897px)': {
              fontSize: '0.92rem',
            },
            fontSize: '1.15rem',
            fontWeight: 'medium',
          }}
        >
          How many hours did you work on this task on
           <Box sx={{fontWeight: '800'}} component="span"> {date}</Box>
          ?
        </Typography>
        <Field.NumericIncremental
          value={value}
          handleChange={handleValue}
          increment={increment}
          error={error}
        />
      </Stack>
      {
        error && (
          <Typography
            sx={{color: 'error.main', fontSize: '12px', textAlign: 'end'}}>
            {error}
          </Typography>
        )
      }

    </Stack>
  )


// ============== IS COMPLETED RADIO BUTTONS ================
export type RadioCompletionButtonProps = {
  value: boolean ;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
}
export function RadioCompletionButtons(
  {
    error,
    value,
    handleChange,
  }: RadioCompletionButtonProps) {
  return (
    <Stack >
      <FormControl sx={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        '@media (max-width: 897px)': {
          flexDirection: 'column',
          alignItems: 'flex-start',
        },
      }}>
        <Typography
          sx={{
            '@media (max-width: 897px)': {
              fontSize: '0.92rem',
            },
            fontSize: '1.15rem',
            fontWeight: 'medium',
          }}
          id="is-completed-input"
        >Is this task completed
        </Typography>
        <RadioGroup

          sx={{display: 'flex', gap: 3}}
          row
          name="is-completed-input"
          value={String(value)}
          onChange={handleChange}
        >
          <FormControlLabel
            value="true"
            control={
              <Radio
                sx={{
                  '& .MuiSvgIcon-root': {
                    fontSize: 25,
                  },
                }}/>}
            label="Yes"
          />
          <FormControlLabel
            value="false"
            control={
              <Radio
                sx={{
                  '& .MuiSvgIcon-root': {
                    fontSize: 25,
                  },
                }}/>}
            label="No"
          />
        </RadioGroup>

      </FormControl>
      {error && <Typography sx={{fontSize: '12px', color: 'error.main' }} textAlign="end">{error}</Typography>}
    </Stack>
  );
}

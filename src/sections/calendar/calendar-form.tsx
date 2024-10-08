import type {ReactNode} from "react";
import type { ICalendarEvent } from 'src/types/calendar';

import dayjs from "dayjs";
import {toast} from "sonner";
import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useEffect, useCallback} from "react";

import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import LoadingButton from '@mui/lab/LoadingButton';
import DialogActions from '@mui/material/DialogActions';

import { Form, Field } from 'src/components/hook-form';

import {handleTimesheetCreate, handleTimesheetUpdate} from "../../actions/calendar";


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
  hours: number | null; // Allow `null` here
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
  hours: zod.number().nullable().refine((value) => value !== null, {
    message: 'Hours is a required field',
  }),
})

// ----------------------------------------------------------------------

type Props = {
  onClose: () => void;
  currentEvent?: ICalendarEvent;
  events: ICalendarEvent[];
};

export function CalendarForm({events, currentEvent, onClose }: Props) {
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
    trigger,
    formState: { isSubmitting, errors },
  } = methods;
  const values = watch();


  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, currentEvent, reset]);

  const onSubmit = handleSubmit(async (submitData) => {
    if (!submitData.hours || !submitData.task?.id ) return;

    const processedData = {
      timesheetdate: dayjs(currentEvent?.start).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      employeeID: 1,
      hours: submitData.hours,
      taskID: submitData.task.id,
      assignmentID: submitData.task.id
    };
    const isEdit = Boolean(currentEvent?.id);
    const exists = events.find(item => item.extendedProps.taskID === values.task.id);

    try {
      if ( isEdit || exists) {
        // Update existing timesheet
        const res=  await handleTimesheetUpdate({
          ...processedData,
          // id: isEdit ? Number(currentEvent?.id) : Number(exists?.id),
        });
        if(res.data.status === 204) {
          toast.success('Timesheet updated successfully');
        } else {
          toast.error('')
        }

      } else {
        // Create new timesheet
        await handleTimesheetCreate(processedData);
        toast.success('Timesheet created successfully');
      }
      onClose();
    } catch (error) {
      console.log({error})
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
      trigger().then(r => r)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue])

  const handleSubProcessChange = useCallback((value: {id: number | null, name: string | null}) => {
      setValue('subprocess', value)
      setValue('task', resetToDefault)
      trigger().then(r => r)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue])

  const handleTaskChange = useCallback((value: {id: number | null, name: string | null}) => {
      setValue('task', value)
      trigger().then(r => r)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue])

  const handleHourChange = useCallback((hourVal: number | null) => {
      setValue('hours', hourVal)
  }, [setValue]);


  // console.log({values})
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
            processID={values.process.id}
            name="subprocess"
            error={errors?.subprocess?.message || ""}
            label="Sub-process"
            value={values.subprocess.id}
            handleValue={handleSubProcessChange}
          />
        </HorizontalInputContainer>
        { /* ============== TASK ================ */}
          <Typography sx={{mb:1}} variant="h6">Choose the task that you have been working on</Typography>
          <Grid spacing={0} container justifyContent="end">
            <Grid alignContent="center" item xs={4} >
              <Typography variant="body2" sx={{fontWeight: 'medium'}}>Task</Typography>
            </Grid>
            <Grid item xs={8}>
              <Field.SelectTask
                subprocessID={values.subprocess.id}
                name="task"
                error={errors?.task?.message || ""}
                label="Task"
                value={values.task.id}
                handleValue={handleTaskChange}
              />
            </Grid>
            { /* ============== TEXT DISPLAY ================ */}
            <Grid item xs={8}>
              {values.process?.name && values.subprocess?.name && values.task?.name ? (
                <SelectedValues
                  processName={values?.process?.name}
                  subprocessName={values?.subprocess?.name}
                  taskName={values?.task?.name}
                />
              ): null}
            </Grid>
          </Grid>
          <Divider sx={{borderStyle:'dashed', color: '#000'}} variant="fullWidth" />
        { /* ============== HOURS CONTROLLER ================ */}
        <Stack  sx={{mt: 1, mb: 4}} >
          <Stack  flexDirection="row" alignItems="center" spacing={3}>
            <Typography variant="h6">How many hours did you work on this task today?</Typography>
            <Field.NumericIncremental
              value={values.hours}
              handleChange={handleHourChange}
              increment={0.5}

            />
          </Stack>
          <Typography
          sx={{color: 'error.main', fontSize: '12px', textAlign: 'end'}}>
            {errors?.hours?.message}
          </Typography>

        </Stack>

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

const SelectedValues = ({processName, subprocessName, taskName}: SelectedValuesProps) => (
    <Stack flexDirection="row">
      <Box sx={{fontSize: '12px'}} component="p">
        You have selected the task:
        <Box component="span"  sx={{color: "primary.main"}}> {taskName} </Box>
        from the sub-process:
        <Box component="span" sx={{color: "primary.main"}}> {subprocessName} </Box>
        of
        <Box component="span"  sx={{color: "primary.main"}}> {processName}</Box>
      </Box>
    </Stack>
  )


export type HorizontalInputProps = {
  children: ReactNode;
  label: string;
}

export const HorizontalInputContainer = ({children, label}:  HorizontalInputProps) => (
    <Grid container>
      <Grid item sm={4}>
        <Typography variant="body2" sx={{fontWeight: 'medium'}}>{label}</Typography>
      </Grid>
      <Grid item sm={8}>
        {children}
      </Grid>
    </Grid>
  )

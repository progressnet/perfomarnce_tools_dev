import type {ReactNode} from "react";
import type { ICalendarEvent } from 'src/types/calendar';

import { z as zod } from 'zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import LoadingButton from '@mui/lab/LoadingButton';
import DialogActions from '@mui/material/DialogActions';

import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type EventSchemaType = zod.infer<typeof EventSchema>;

export const EventSchema = zod.object({
  process: zod.string().min(1, 'Process is required'),
  subProcess: zod.string().min(1, 'sub-process is required'),
});

// ----------------------------------------------------------------------

type Props = {
  onClose: () => void;
  currentEvent?: ICalendarEvent;
};

export function CalendarForm({ currentEvent, onClose }: Props) {
  const methods = useForm<EventSchemaType>({
    mode: 'all',
    resolver: zodResolver(EventSchema),
    defaultValues: {
      process: currentEvent?.extendedProps.process?.id,
      subProcess: currentEvent?.extendedProps.subProcess?.id
    },
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();


  const onSubmit = handleSubmit(async (data) => {
  });



  const handleProcess = useCallback((value: string) => {
      setValue('process', value)
  }, [setValue])


  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2}>
        <HorizontalInputContainer label="Process">
          <Field.SelectProcess
            name="process"
            error={errors?.process?.message || ""}
            label="Process"
            value={values.process}
            handleValue={handleProcess}
          />
        </HorizontalInputContainer>
        <HorizontalInputContainer label="Sub-process">
          <Field.SelectSubProcess
            name="Sub-process"
            error={errors?.process?.message || ""}
            label="Sub-process"
            value={values.process}
            handleValue={handleProcess}
          />
        </HorizontalInputContainer>
        <Stack spacing={2}>
          <Typography variant="h6">Choose the task that you have been working on</Typography>
          <HorizontalInputContainer label="Task">
            <Field.SelectTask
              name="Task"
              error={errors?.process?.message || ""}
              label="Task"
              value={values.process}
              handleValue={handleProcess}
            />
          </HorizontalInputContainer>
        </Stack>
      </Stack>
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


export type HorizontalInputProps = {
  children: ReactNode;
  label: string;
}

export const HorizontalInputContainer = ({children, label}:  HorizontalInputProps) => (
    <Stack spacing={1} alignItems="center" flexDirection="row">
      <Stack sx={{minWidth: '150px'}}>
        <Typography variant="body2" sx={{fontWeight: 'medium'}}>{label}</Typography>
      </Stack>
      {children}
    </Stack>
  )

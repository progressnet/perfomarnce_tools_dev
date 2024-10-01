import type { TextFieldProps } from '@mui/material/TextField';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import {useGetTask} from "../../actions/task";

// ----------------------------------------------------------------------


export type RHFAutocompleteProps =  {
  name: string;
  label?: string;
  placeholder?: string;
  value: any;
  helperText?: React.ReactNode;
  variant?: TextFieldProps['variant'];
  error?: string;
  handleValue: (name: string, value: any, options?: any) => void;
};

export function RHFSelectTask(
  {
    name,
    handleValue,
    label,
    error,
    variant,
    helperText,
    placeholder,
  }: RHFAutocompleteProps) {
  const {tasks, error: taskError} = useGetTask();


  return (
    <Autocomplete
      sx={{width: '100%'}}
      id={`rhf-autocomplete-${name}`}
      onChange={(event, newValue) => handleValue(name, newValue?.id || null, { shouldValidate: true })} // Safely handle newValue
      options={tasks}
      getOptionLabel={(option) => option.taskName}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          variant={variant}
          error={!!error || !!taskError}
          helperText={ taskError || error || helperText}
          inputProps={{ ...params.inputProps, autoComplete: 'task' }}
        />
      )}
    />
  );
}

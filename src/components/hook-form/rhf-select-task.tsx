import type { TextFieldProps } from '@mui/material/TextField';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { useGetTaskByParent} from "../../actions/task";

// ----------------------------------------------------------------------


export type RHFAutocompleteProps =  {
  name: string;
  label?: string;
  placeholder?: string;
  value: number;
  helperText?: React.ReactNode;
  variant?: TextFieldProps['variant'];
  error?: string;
  handleValue: ( newValue: {id: number, name: string}) => void;
  subprocessID: number;

};

export function RHFSelectTask(
  {
    name,
    subprocessID,
    handleValue,
    label,
    error,
    value,
    variant,
    helperText,
    placeholder,
  }: RHFAutocompleteProps) {
  const {tasks, error: taskError} = useGetTaskByParent(subprocessID);
  return (
    <Autocomplete
      sx={{width: '100%'}}
      id={`rhf-autocomplete-${name}`}
      value={tasks.find((item) => item.taskID === value) || null}
      onChange={(event, newValue) => handleValue({id: newValue?.taskID || 0, name: newValue?.taskName || ""})}
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


import type { TextFieldProps } from '@mui/material/TextField';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { useGetTaskByParent} from "../../actions/task";

// ----------------------------------------------------------------------


export type RHFAutocompleteProps =  {
  name: string;
  label?: string;
  placeholder?: string;
  value: number | null;
  helperText?: React.ReactNode;
  variant?: TextFieldProps['variant'];
  error?: string;
  handleValue: ( newValue: {id: number | null, name: string | null}) => void;
  subprocessID: number | null;

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
      id={`rhf-autocomplete-${name}-${Math.random()}`}
      value={tasks.find((item) => item?.taskID === value) || null}
      onChange={(event, newValue) => handleValue({id: newValue?.taskID || null, name: newValue?.taskName || null})}
      options={tasks}
      getOptionLabel={(option) => option?.taskName}
      renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            variant={variant}
            error={!!error || !!taskError?.errors[0]}
            helperText={ taskError?.errors.map((er: string ) => er).join(", ") || error || helperText}
            // inputProps={{ ...params.inputProps, autoComplete: 'new-password' }}
          />

      )}
    />

  );
}


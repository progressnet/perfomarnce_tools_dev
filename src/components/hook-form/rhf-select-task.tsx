import type { TextFieldProps } from '@mui/material/TextField';

import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
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
  console.log({tasks})
  return (
    <Autocomplete
      sx={{width: '100%'}}
      id={`rhf-autocomplete-${name}-${Math.random()}`}
      value={tasks.find((item) => item?.taskId === value) || null}
      onChange={(event, newValue) => handleValue({id: newValue?.taskId || null, name: newValue?.taskName || null})}
      options={tasks}
      getOptionLabel={(option) => `${option?.taskName} - ${option?.leCode}`}
      renderOption={(props, option) => (
        <li  {...props}>
          <Typography variant="body2" component="span">{option?.taskName}
            <Box sx={{color: 'primary.main', fontWeight: 'bold'}} component="span"> {` - ${option?.leCode}`}</Box>
          </Typography>

        </li>
      )}
      renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            variant={variant}
            error={!!error || !!taskError?.errors[0]}
            helperText={ taskError?.errors.map((er: string ) => er).join(", ") || error || helperText}
          />

      )}
    />

  );
}


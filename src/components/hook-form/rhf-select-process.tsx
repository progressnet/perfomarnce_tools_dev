import type { TextFieldProps } from '@mui/material/TextField';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import {useGetProcess} from "../../actions/process";

import type {EventSchemaType} from "../../sections/calendar/calendar-form";


// ----------------------------------------------------------------------


export type RHFAutocompleteProps =  {
  name:  keyof EventSchemaType;
  label?: string;
  placeholder?: string;
  value: number | null;
  helperText?: React.ReactNode;
  variant?: TextFieldProps['variant'];
  error?: string;
  handleValue: (value: {id: number | null, name: string | null} ) => void;
};

export function RHFSelectProcess(
  {
    name,
    value,
    handleValue,
    label,
    error,
    variant,
    helperText,
    placeholder,
  }: RHFAutocompleteProps) {
  const {processes, error: processError} = useGetProcess();



  return (
    <Autocomplete
      sx={{width: '100%'}}
      id={`rhf-autocomplete-${name}`}
      onChange={(event, newValue) => handleValue({id: newValue?.id || null, name: newValue?.processName || null} )}
      options={processes}
      getOptionLabel={(option) => option.processName}
      value={processes.find((process) => process.id === value) || null}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          variant={variant}
          error={!!error || !!processError}
          helperText={ processError || error || helperText} // Better handling of error and helperText
        />
      )}
    />
  );
}

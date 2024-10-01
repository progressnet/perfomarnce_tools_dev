import type { TextFieldProps } from '@mui/material/TextField';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import {useGetSubProcess} from "../../actions/subprocess";

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

export function RHFSelectSubProcess(
  {
    name,
    handleValue,
    label,
    error,
    variant,
    helperText,
    placeholder,
  }: RHFAutocompleteProps) {
  const {subprocesses, error: processError} = useGetSubProcess();


  return (
    <Autocomplete
      sx={{width: '100%'}}
      id={`rhf-autocomplete-${name}`}
      onChange={(event, newValue) => handleValue(name, newValue?.id || null, { shouldValidate: true })} // Safely handle newValue
      options={subprocesses}
      getOptionLabel={(option) => option.subProcess}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          variant={variant}
          error={!!error || !!processError}
          helperText={ processError || error || helperText} // Better handling of error and helperText
          inputProps={{ ...params.inputProps, autoComplete: 'new-password' }}
        />
      )}
    />
  );
}

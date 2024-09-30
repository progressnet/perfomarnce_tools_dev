import type { TextFieldProps } from '@mui/material/TextField';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

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

export function RHFSelectProcess(
  {
    name,
    handleValue,
    label,
    error,
    variant,
    helperText,
    placeholder,
  }: RHFAutocompleteProps) {
  return (
    <Autocomplete
      sx={{width: '100%'}}
      id={`rhf-autocomplete-${name}`}
      onChange={(event, newValue) => handleValue(name, newValue?.value || null, { shouldValidate: true })} // Safely handle newValue
      options={[
        { label: 'Process 1', value: 'process1' },
        { label: 'Process 2', value: 'process2' },
        { label: 'Process 3', value: 'process3' },
      ]}
      getOptionLabel={(option) => option.label} // Use getOptionLabel for better readability
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          variant={variant}
          error={!!error}
          helperText={error || helperText} // Better handling of error and helperText
          inputProps={{ ...params.inputProps, autoComplete: 'new-password' }}
        />
      )}
    />
  );
}

import type { TextFieldProps } from '@mui/material/TextField';
import type { AutocompleteProps } from '@mui/material/Autocomplete';

import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// ----------------------------------------------------------------------

export type AutocompleteBaseProps = Omit<
  AutocompleteProps<any, boolean, boolean, boolean>,
  'renderInput'
>;

export type RHFAutocompleteProps = AutocompleteBaseProps & {
  name: string;
  label?: string;
  placeholder?: string;
  hiddenLabel?: boolean;
  helperText?: React.ReactNode;
  variant?: TextFieldProps['variant'];
  error: string;
  handleValue: (name: string, value: any, options?: any) => void;
};

export function RHFSelectSubProcesses(
  {
    handleValue,
    name,
    label,
    error,
    variant,
    helperText,
    placeholder,
    ...other
  }: RHFAutocompleteProps) {

  return (
    <Autocomplete
      id={`rhf-autocomplete-${name}`}
      onChange={(event, newValue) => handleValue(name, newValue, { shouldValidate: true })}
      options={[]}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          variant={variant}
          error={!!error}
          helperText={error || helperText}
          inputProps={{ ...params.inputProps, autoComplete: 'new-password' }}
        />
      )}
    />
  );
}

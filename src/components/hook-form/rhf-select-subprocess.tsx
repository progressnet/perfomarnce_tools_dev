import type { TextFieldProps } from '@mui/material/TextField';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { useGetSubProcessByProcess } from "../../actions/subprocess";

// ----------------------------------------------------------------------

export type RHFAutocompleteProps = {
  name: string;
  label?: string;
  placeholder?: string;
  value: number | null;
  helperText?: React.ReactNode;
  variant?: TextFieldProps['variant'];
  error?: string;
  handleValue: (value: {id: number | null, name: string | null}) => void;
  processID: number | null;
};

export function RHFSelectSubProcess(
  {
    name,
    value,
    handleValue,
    processID,
    label,
    error,
    variant,
    helperText,
    placeholder,
  }: RHFAutocompleteProps) {
  const { subprocesses, error: subprocessError } = useGetSubProcessByProcess(processID);
  return (
    <Autocomplete
      sx={{ width: '100%', minWidth: 200 }}
      disabled={!processID}
      id={`rhf-autocomplete-${name}`}
      value={subprocesses.find((subprocess) => subprocess?.id === value) || null}
      onChange={(event, newValue) => handleValue({id: newValue?.id || null, name: newValue?.subProcess || null})}
      options={subprocesses}
      getOptionLabel={(option) => option.subProcess}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          variant={variant}
          error={!!error || !!subprocessError}
          helperText={subprocessError || error || helperText}
        />
      )}
    />
  );
}

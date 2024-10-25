import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Stack from "@mui/material/Stack";
import { useGetLegalEntity } from "../../actions/legalEntity";
import {FlagIcon} from "../iconify";

export function CustomCountrySelect(
  {
    name,
    label,
    value,
    error,
    variant,
    helperText,
    placeholder,
  }: {
  name: string;
  label: string;
  error: string;
  value: number | null;
  variant: string;
  helperText: string;
  placeholder: string;
}) {
  const { entities, error: entityError } = useGetLegalEntity();

  return (
    <Autocomplete
      sx={{ width: "100%" }}
      options={entities}
      getOptionLabel={(option) => `${option.country} - ${option.city}`}
      renderOption={(props, option) => (
        <Stack sx={{p: 1}}>
          <Typography sx={{
            fontSize: 15,
          }}>{`${option.code} - ${option.country}`}</Typography>
          <Typography sx={{
            fontSize: 14,
            color: 'text.secondary'
          }}>{`${option.city}`}</Typography>
        </Stack>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          error={!!error || !!entityError?.errors[0]}
          helperText={
            entityError?.errors.map((er: string) => er).join(", ") ||
            error ||
            helperText
          }
        />
      )}
    />
  );
}

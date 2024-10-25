import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Stack from "@mui/material/Stack";
import { useGetLegalEntity } from "../../actions/legalEntity";
import {FlagIcon} from "../iconify";

export function CustomStatusSelect(
  {
    label,
    value,
    placeholder,
    handleChange,
    helperText,
  }: {
    label: string;
    value: number | null;
    helperText?: string;
    placeholder?: string;
    handleChange: (id: number) => void;
  }) {
  const statusData = [
    {
      id: 1,
      name: 'Not started',
    },
    {
      id: 2,
      name: 'Ongoing',
    },
    {
      id: 3,
      name: 'Completed',
    },
  ]
  return (
    <Autocomplete
      sx={{ width: "100%" }}
      options={statusData}
      value={statusData.find((option) => option.id === value)}
      isOptionEqualToValue={(option, val) => option?.id === val.id}
      onChange={(event, newValue) => {
        if(!newValue?.id) return;
        handleChange(newValue?.id);
      }}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
        />
      )}
    />
  );
}

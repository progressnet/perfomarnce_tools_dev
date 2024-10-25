import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import {Iconify} from "../../iconify";

type SearchInputProps = {
  value: string;
  handleValue: (value: string) => void;
  placeholder: string;
};

export function SearchInput(
  {
    value,
    handleValue,
    placeholder
  }:SearchInputProps) {
  return (
    <TextField
      value={value}
      onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleValue(e.target.value)}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        ),
      }}
    />

  )
}

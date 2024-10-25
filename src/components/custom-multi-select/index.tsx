import type { SelectChangeEvent } from "@mui/material";

import { useState } from "react";

import { Select, MenuItem, Checkbox, InputLabel, FormControl, OutlinedInput } from "@mui/material";

import { varAlpha } from "../../theme/styles";

export type CustomMultiSelectProps<T> = {
  id: string;
  options: T[];
  handleApply: (data: T[]) => void;
  displayName: keyof T;
  displayKey: keyof T;
};



export function CustomMultiSelect<T>(
  {
    id,
    options,
    displayName,
    displayKey,
    handleApply,
  }: CustomMultiSelectProps<T>) {
  const [localState, setLocalState] = useState<T[]>([]);

  const handleChange = (event: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = event;
    setLocalState(value as T[]);

  };

  return (
    <FormControl sx={{ width: "100%", minWidth: 300 }}>
      <InputLabel id={id}>Tag</InputLabel>
      <Select
        labelId={id}
        id="demo-multiple-checkbox"
        multiple
        value={localState}
        onChange={handleChange}
        input={<OutlinedInput label="Status" />}
        renderValue={(selected) => selected.map((value) => value && value[displayName]).join(", ")}
        sx={{ textTransform: "capitalize", width: "100%" }}
      >
        {options.map((option) => (
          <MenuItem key={option[displayKey] as string | number} value={option as any} >
            <Checkbox
              disableRipple
              size="small"
              checked={localState.some((item) => item && item[displayKey] === option[displayKey])}
            />
            {option[displayName] as string}
          </MenuItem>
        ))}
        <MenuItem
          onClick={() => handleApply(localState)}
          sx={{
            justifyContent: "center",
            fontWeight: (theme) => theme.typography.button,
            border: (theme) => `solid 1px ${varAlpha(theme.vars.palette.grey["500Channel"], 0.16)}`,
            bgcolor: (theme) => varAlpha(theme.vars.palette.grey["500Channel"], 0.08),
          }}
        >
          Apply
        </MenuItem>
      </Select>
    </FormControl>
  );
}

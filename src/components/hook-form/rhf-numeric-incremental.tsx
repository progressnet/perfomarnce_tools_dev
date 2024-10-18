import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from '@mui/material/IconButton';

import {Iconify} from "../iconify";

type Props = {
  value: number | null;
  handleChange: (value: number | null) => void;
  increment: number;
  error?: string;
};

export function RHFNumericIncremental(
  {
    value,
    handleChange,
    increment,
    error,
  }: Props) {


  const handleIncrement = (incValue: number) => {
    const newValue = value !== null ? value + incValue : incValue;
    if(newValue < 0) return;
    handleChange(newValue);
  };

  const onChange = (newVal: string ) => {
     if(newVal === '') {
      handleChange(null);
      return;
     }
     if(newVal < '0') return;
    handleChange(Number(newVal));
  }
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      {/* Minus Button */}
      <IconButton
        onClick={() => handleIncrement(-increment)}
        sx={{ padding: 0.3, backgroundColor: 'rgb(216,235,255)', color: 'primary.main' }}
        size="small"
      >
        <Iconify icon="mdi:minus" fontSize={24} />
      </IconButton>

      {/* Text Field */}
      <TextField
        onKeyDown={(event) => {
          if (
            event.key === 'Backspace' ||
            event.key === 'Delete' ||
            event.key === 'Tab' ||
            event.key === 'Escape' ||
            event.key === 'Enter' ||
            event.key === 'ArrowLeft' ||
            event.key === 'ArrowRight' ||
            event.key === 'ArrowUp' ||
            event.key === 'ArrowDown'
          ) {
            return;
          }
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
        error={!!error}
        value={value !== null ? value : ''}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          width: '60px',
          height: '60px',
          "& input": {
            textAlign: 'center',
          }
        }}
        name="hours"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />

      {/* Plus Button */}
      <IconButton
        onClick={() => handleIncrement(increment)}

        sx={{ padding: 0.3, backgroundColor: 'rgb(216,235,255)', color: 'primary.main' }}
      >
        <Iconify  icon="mdi:plus" fontSize={24} />
      </IconButton>
    </Stack>
  );
}

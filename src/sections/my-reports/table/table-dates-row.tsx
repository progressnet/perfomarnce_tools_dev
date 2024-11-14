import Stack from "@mui/material/Stack";
import {formHelperTextClasses} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";


type TableFiltersRowProps = {
  valueStart: string | null;
  valueEnd: string | null;
  onChange: (type: 'start' | 'end', value: string) => void;
  dateError: boolean;
}
export function TableDatesRow({valueStart, valueEnd, onChange, dateError}: TableFiltersRowProps) {
  return (
    <Stack padding={2} flexDirection="row" spacing={2}>
      <DatePicker
        label="Start date"
        value={dayjs(valueStart)}
        onChange={(date) => onChange('start', dayjs(date).format('YYYY-MM-DD'))}
        slotProps={{
          textField: {
            fullWidth: true,
          },
        }}
        sx={{
          maxWidth: { md: 200 },
        }}
      />
      <DatePicker
        label="End date"
        value={dayjs(valueEnd)}
        onChange={(date) => onChange('end',dayjs(date).format('YYYY-MM-DD'))}
        slotProps={{
          textField: {
            fullWidth: true,
            error: dateError,
            helperText: dateError && 'End date must be later than start date',
          },
        }}
        sx={{
          maxWidth: { md: 200 },
          [`& .${formHelperTextClasses.root}`]: {
            position: { md: 'absolute' },
            bottom: { md: -40 },
          },
        }}
      />
    </Stack>
  )
}

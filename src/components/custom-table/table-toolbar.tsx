import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  filter: string;
  onChangeFilter: (value: string) => void;
  padding?: number | string;
  marginBottom?: number | string;
};

export function TableToolbar({ filter, onChangeFilter, padding = 2.5, marginBottom = 0  }: Props) {
  const handleFilter = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeFilter(event.target.value)
    },
    [onChangeFilter ]
  );

  const handleClear = useCallback(
    () => {
      onChangeFilter('')
    }, [onChangeFilter]
  )

  const INPUT_PROPS = {
    startAdornment: (
      <InputAdornment position="start">
        <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
      </InputAdornment>
    ),
    endAdornment: filter ? (
      <InputAdornment position="end">
        <IconButton onClick={handleClear}>
          <Iconify icon="eva:close-fill" sx={{ color: 'text.disabled' }} />
        </IconButton>
      </InputAdornment>
    ) : null,
  };
  return (
      <Stack
        spacing={2}
        sx={{ p: padding, mb: marginBottom, pr: { xs: 2.5, md: 1 } }}
      >
        <Stack  sx={{
          maxWidth: 300,
          position: 'relative'
        }}>
          <TextField
            value={filter}
            onChange={handleFilter}
            placeholder="Αναζήτηση..."
            inputProps={{
              style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
            }}
            InputProps={INPUT_PROPS}
          />
        </Stack>


      </Stack>
  );
}

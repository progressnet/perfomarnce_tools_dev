import { useCallback } from 'react';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

type Props = {
  filter: string;
  onChangeFilter: (value: string) => void;
  padding?: number | string;
  marginBottom?: number | string;
};

export function SearchFilter({ filter, onChangeFilter, padding = 2.5, marginBottom = 0 }: Props) {
  const handleFilter = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeFilter(event.target.value);
    },
    [onChangeFilter]
  );

  const handleClear = useCallback(() => {
    onChangeFilter('');
  }, [onChangeFilter]);

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
  );
}

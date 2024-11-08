'use client';

import * as React from 'react';

import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';

import Stack from '@mui/material/Stack';
import type { TableHeaderProps } from './_types';
import { Iconify } from '../iconify';

export function TableHeader({ checkboxSelection, labels, table, data }: TableHeaderProps) {
  return (
    <TableHead>
      <TableRow>
        {checkboxSelection && (
          <TableCell padding="checkbox">
            <Checkbox
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                table.onSelectAllRows(
                  event.target.checked,
                  data.map((row) => row.id)
                )
              }
              inputProps={{
                name: 'select-all-rows',
                'aria-label': 'select all rows',
              }}
            />
          </TableCell>
        )}
        {labels.map((label) => (
          <TableCell
            sx={{
              textWrap: 'wrap',
              whiteSpace: 'normal', // Allow wrapping
              wordWrap: 'break-word', // Break words to prevent overflow
              alignItems: 'center',
            }}
            key={label.id}
          >
            {/* ========== IMPLEMENT SORTING ========= */}
            <Stack
              sx={{ cursor: label.sort ? 'pointer' : 'default' }}
              flexDirection="row"
              alignItems="center"
              spacing={1}
              onClick={() => label.sort && table.onSortChange(label.id || '')}
            >
              {label.label}
              {label.sort && (
                <Iconify
                  icon={table.sortConfig[label.id || ''] === -1 ? 'bi:arrow-up' : 'bi:arrow-down'}
                  width={16}
                />
              )}
            </Stack>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

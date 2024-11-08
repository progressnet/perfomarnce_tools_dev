import * as React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TablePagination from '@mui/material/TablePagination';

import { Iconify } from 'src/components/iconify';

import { TableHeader } from './header';
import { Scrollbar } from '../scrollbar';
import { TableSkeleton } from './tableSkeleton';
import { ConfirmDialog } from '../custom-dialog';

import type { CustomReusableTableProps, TableSelectedRowsActionProps } from './_types';

// ------------------------------------------------------------------------------------------
// ------------------ Reusable Table Component ----------------------------------------------
// ------------------------------------------------------------------------------------------
const DEFAULT_COLUMN_WIDTH = 'auto'; // Define your default width here
// ------------------------------------------------------------------------------------------

export function CustomReusableTable({
  data,
  table,
  columns,
  toolbar,
  cellPadding,
  actionHandlers,
  onDeleteRows,
  loading,
  total,
  checkboxSelection = true,
}: CustomReusableTableProps) {

  return (
    <Card>
      <div>{toolbar}</div>
      <Box sx={{ position: 'relative' }}>
        <TableSelectedRowsAction table={table} onDeleteRows={onDeleteRows} data={data} />
        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
            <TableHeader
              checkboxSelection={checkboxSelection}
              labels={columns}
              table={table}
              data={data}
            />
            <TableBody>
              {data.length === 0 && !loading ? (
                <EmptyContent length={actionHandlers ? columns.length + 1 : columns.length} />
              ) : (
                data.map((row, index) => (
                  <TableRow key={`${row.id}-${index}`} selected={table.selected.includes(row.id)}>
                    {checkboxSelection && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={table.selected.includes(row.id)}
                          onChange={() => table.onSelectRow(row.id)}
                          inputProps={{
                            'aria-labelledby': `row-${row.id}`,
                          }}
                        />
                      </TableCell>
                    )}
                    {columns.map((column, index2) => {

                      return (
                        <TableCell
                          sx={{
                            ...(cellPadding ? { padding: cellPadding } : {}),
                            ...(column.width ? { width: column.width } : {}),
                            maxWidth: column?.maxWidth ? `${column.maxWidth} !important` : undefined,
                            minWidth: column?.minWidth,
                          }}
                          key={`${column.id}-${index2}`}
                        >
                          {actionHandlers ? column.render(row, actionHandlers) : column.render(row)}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))
              )}
              {loading && <TableSkeleton rows={table.rowsPerPage} columnsLength={columns.length} />}
            </TableBody>
          </Table>
        </Scrollbar>
      </Box>
      <Box>
        test
      </Box>
      <Box sx={{ position: 'relative' }}>
        <TablePagination
          labelRowsPerPage="Εγγραφές ανά σελίδα:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} από ${count !== -1 ? count : `πάνω από ${to}`}`
          }
          count={total || 0}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onRowsPerPageChange={table.onChangeRows}
          // @ts-ignore
          onPageChange={(event, pageNumber: number) => table.onChangePage(pageNumber)}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          sx={{ borderTopColor: 'transparent' }}
        />
      </Box>
    </Card>
  );
}

// ------------------------------------------------------------------------------------------
// --------------------------------- TableSelectedRowsAction ---------------------------------
// ------------------------------------------------------------------------------------------

export function TableSelectedRowsAction({ table, data, onDeleteRows }: TableSelectedRowsActionProps) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const numSelected = table.selected.length;
  const rowCount = data.length;

  if (!numSelected) {
    return null;
  }
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        pl: 1,
        pr: 2,
        top: 0,
        left: 0,
        width: 1,
        zIndex: 9,
        height: 58,
        position: 'absolute',
        bgcolor: 'primary.lighter',
        ...(table.dense && { height: 38 }),
      }}
    >
      <Checkbox
        indeterminate={!!numSelected && numSelected < rowCount}
        checked={!!rowCount && numSelected === rowCount}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          table.onSelectAllRows(
            event.target.checked,
            data.map((row) => row.id)
          )
        }
      />
      <Typography
        variant="subtitle2"
        sx={{
          flexGrow: 1,
          color: 'primary.main',
          ...(table.dense && { ml: 3 }),
        }}
      >
        {numSelected} {numSelected === 1 ? 'Επιλεγμένο' : 'Επιλεγμένα'}
      </Typography>
      <Tooltip title="Διαγραφή">
        <IconButton color="primary" onClick={() => setOpenDialog(true)}>
          <Iconify icon="solar:trash-bin-trash-bold" />
        </IconButton>
      </Tooltip>
      <ConfirmDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title="Διαγραφή"
        content={
          <>
            Σίγουρα θέλετε να διαγράψετε <strong> {table.selected.length} </strong> αντικείμενα?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              if (onDeleteRows) {
                onDeleteRows(table.selected);
                table.setSelected([]);
              } else {
                console.info('Delete function not provided');
              }
              setOpenDialog(false);
            }}
          >
            Διαγραφή
          </Button>
        }
      />
    </Stack>
  );
}

type EmptyContentProps = {
  length: number;
};

const EmptyContent = ({ length }: EmptyContentProps) => (
  <TableRow>
    <TableCell
      colSpan={length}
      sx={{
        textAlign: 'left', // Align text to the left
      }}
    >
      <Stack
        sx={{
          backgroundColor: 'grey.50',
          borderRadius: 1,
        }}
        direction="row"
        alignItems="center"
        spacing={1}
      >
        <Box
          component="img"
          src="/assets/icons/empty/ic-content.svg"
          alt="No data icon"
          width={100}
          height={100}
        />
        <Typography variant="body2" color="textSecondary">
          Δεν υπάρχουν δεδομένα
        </Typography>
      </Stack>
    </TableCell>
  </TableRow>
);

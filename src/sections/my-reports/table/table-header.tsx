import {Box, TableRow, TableCell, TableHead, Typography} from "@mui/material";

import {CELL_BOX_SHADOW, FIRST_CELL_WIDTH, SECOND_CELL_WIDTH, CELL_BORDER_RIGHT, FIRST_COLUMN_WIDTH} from "../config";

import type {IDateColumn} from "../../../types/summary";

export function CustomTableHeader({columns}: { columns: IDateColumn[] }) {
  return (
    <TableHead>
      <TableRow sx={{backgroundColor: 'grey.200'}}>
        <TableCell sx={{
          position: 'sticky',
          left: 0,
          top: 0,
          display: 'flex',
          borderRight: CELL_BORDER_RIGHT,
          boxShadow: CELL_BOX_SHADOW,
          minWidth: FIRST_COLUMN_WIDTH,
          alignItems: 'space-between',
        }}>
          <Box sx={{padding: 0, width: '100%', minWidth: FIRST_CELL_WIDTH,}}>
            <Typography sx={{textWrap: 'nowrap', fontSize: '14px'}}>Data Tree</Typography>
          </Box>
          <Box sx={{padding: 0, width: '100%', minWidth: SECOND_CELL_WIDTH, paddingRight: 1}}>
            <Typography sx={{textWrap: 'nowrap', textAlign: 'end', fontSize: '14px'}}>Total</Typography>
          </Box>
        </TableCell>
        {
          columns.map((date, index) => (
            <TableCell key={`${date}-${index}`}>
              <Typography sx={{textWrap: 'nowrap', fontSize: '14px'}}>{date.id}</Typography>
            </TableCell>
          ))
        }
      </TableRow>
    </TableHead>
  )
}

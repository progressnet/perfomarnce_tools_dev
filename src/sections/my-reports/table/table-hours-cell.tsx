import * as React from "react";

import Typography from "@mui/material/Typography";
import {Box, alpha, Stack, TableCell} from "@mui/material";

import {EmptyCell} from "./table-empty-cell";



type CustomHoursCellProps = {
  children: React.ReactNode;
  color: string;
};
export function TableHoursCell({children, color}: CustomHoursCellProps) {
  if(children === 0) return <EmptyCell />;
  return (
    <TableCell>
      <Stack flexDirection="row" alignItems="center" justifyContent="center" sx={{width: '100%'}}>
        <Box sx={{
          borderRadius: '6px',
          backgroundColor: alpha(color, 0.05),
          border: 1,
          borderColor:alpha(color, 0.3),
          color,
          padding: '2px 0',
          minWidth: '45px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center'}}
        >
          <Typography sx={{fontSize: '13px'}}>
            {children} H
          </Typography>
        </Box>
      </Stack>

    </TableCell>
  )
}




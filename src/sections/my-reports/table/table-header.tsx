
import {TableRow, TableCell, TableHead, Typography, Box} from "@mui/material";

import type {DateColumn} from "./_types";

export function CustomTableHeader({columns}: {columns: DateColumn[]}) {
    return (
        <TableHead>
            <TableRow sx={{backgroundColor: 'grey.200'}}>
                <TableCell sx={{ display: 'flex',alignItems: 'space-between', columnGap:4, minWidth: '180px'}}>
                    <Box sx={{padding: 0, width: '100%',    minWidth: '150px',}}>
                        <Typography  sx={{textWrap: 'nowrap', fontSize: '14px'}}>Data Tree</Typography>
                    </Box>
                    <Box sx={{padding: 0, width: '100%', minWidth: '70px'}}>
                        <Typography  sx={{textWrap: 'nowrap', fontSize: '14px'}}>Total</Typography>
                    </Box>
                </TableCell>
                {
                    columns.map((date, index) => (
                        <TableCell key={`${date}-${index}`}>
                            <Typography sx={{textWrap: 'nowrap',  fontSize: '14px'}}>{date.id}</Typography>
                        </TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    )
}

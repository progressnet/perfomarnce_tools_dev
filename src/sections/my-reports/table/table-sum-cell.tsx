import * as React from "react";

import Typography from "@mui/material/Typography";
import {alpha, Box, TableCell} from "@mui/material";

import Stack from "@mui/material/Stack";
import {EmptyCell} from "./table-empty-cell";



type CustomHoursCellProps = {
    children: React.ReactNode;
    key: string;
    color: string;
};
export function CustomHoursCell({children, key, color}: CustomHoursCellProps) {
    if(children === 0) return <EmptyCell />;
    return (
        <TableCell key={key}>
            <Box sx={{
                borderRadius: '6px',
                backgroundColor: alpha(color, 0.05),
                border: 1,
                borderColor:alpha(color, 0.3),
                color,
                height: '30px',
                width: '45px',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center'}}
            >
                <Typography sx={{fontSize: '13px'}}>
                    {children} H
                </Typography>
            </Box>
        </TableCell>
    )
}


type CustomSumCellProps = {
    children: React.ReactNode;
    color: string;
    textColor?: string;
};
export function TableSumCell({children, color, textColor = 'white'}:CustomSumCellProps) {
    if(children === 0) return <EmptyCell />;
    return (
        <Stack sx={{padding: 0, minWidth: '70px'}}>
            <Box sx={{
                borderRadius: '6px',
                backgroundColor: color,
                color: textColor,
                height: '30px',
                width: '45px',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center'}}
            >
                <Typography sx={{fontSize: '13px'}}>
                    {children} H
                </Typography>

            </Box>
        </Stack>
    )
}

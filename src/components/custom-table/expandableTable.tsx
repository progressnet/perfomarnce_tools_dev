import * as React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import {alpha, Typography} from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from "@mui/material/TableHead";

import { Scrollbar } from '../scrollbar';

const columns = [
  {
    id: 'country',
    label: 'Country',
    width: '150px',
  },
  {
    id: 'taskName',
    label: 'Task Name',
    width: '150px',
  },
  {
    id: 'agent',
    label: 'Agent',
    width: '150px',
  },
];

interface Column {
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

export type CustomExpandableTableProps = {
  data: any;
  table: any;
}

export function CustomExpandableTable(
  {
    data,
    table,
  }: CustomExpandableTableProps) {
  const dateColumns = Array.from(
    new Set(
      data.flatMap((country: any) =>
        country.tasks.flatMap((task: any) =>
          task.totalHours ? Object.keys(task.totalHours) : []
        )
      )
    )
  );

  const dynamicColumns = [
    ...columns,
    ...dateColumns.map((date) => ({
      id: date,
      label: date,
      minWidth: 100,
    }))
  ];

  return (
    <Card>
      <Box sx={{ overflowX: 'auto', position: 'relative' }}>
        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
            <TableHead>
              <TableRow>
                {dynamicColumns.map((column: any) => (
                  <TableCell key={column.id}>
                    {column.label}
                  </TableCell>
                ))}
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((countryItem: any, countryIndex: number) =>{
                return (
                  <React.Fragment key={countryIndex}>
                     {/* ============= SHOW COUNTRY ROW ============ */}
                    <TableRow sx={{backgroundColor: "grey.300"}}>
                      <TableCell colSpan={dynamicColumns.length}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="subtitle1">{countryItem.country}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell />
                    </TableRow>
                    {countryItem.tasks.map((task: any, taskIndex: number) => {
                      // Calculate total hours for each task
                      const totalHours = Object.values(task.totalHours).reduce((a: number, b: number) => a + b, 0);
                      return (
                        <React.Fragment key={taskIndex}>
                          <TableRow>
                            <TableCell />
                            <TableCell>{task.taskName}</TableCell>
                            <TableCell />
                            {dateColumns.map((date) => (
                              <TableCell key={date}>
                                {task.totalHours[date] ?? '-'}
                              </TableCell>
                            ))}
                            <TableCell>
                              <Stack
                                alignItems="center"
                                justifyContent="center"
                                borderRadius={1}
                                sx={{
                                  backgroundColor: 'primary.main',
                                  color: 'white',
                                  width: '35px',
                                  height: '35px'
                              }}>
                                {totalHours }
                              </Stack>
                            </TableCell>
                          </TableRow>
                          {task.agents.map((agent: any, agentIndex: number) => (
                            <TableRow key={agentIndex}>
                              <TableCell />
                              <TableCell />
                              <TableCell>{agent.firstName}</TableCell>
                              {dateColumns.map((date) => (
                                <TableCell key={date}>
                                  {agent.dates[date] ?? '-'}
                                </TableCell>
                              ))}
                              <TableCell>
                                {agent.dates ? Object.values(agent.dates).reduce((a: number, b: number) => a + b, 0) : '-'}
                              </TableCell>
                            </TableRow>
                          ))}
                        </React.Fragment>
                      )
                    })}
                  </React.Fragment>
                )
              })}
            </TableBody>
          </Table>
        </Scrollbar>
      </Box>
    </Card>
  );
}

import * as React from 'react';

import {Box, Card, Table, TableRow, TableHead, TableCell, TableBody, Typography} from "@mui/material"

import { Scrollbar } from '../scrollbar';
import IconButton from "@mui/material/IconButton";
import {Iconify} from "../iconify";

const columns = [
  {
    id: 'country',
    label: 'Country',
    width: '100px'
  },
  {
    id: 'taskName',
    label: 'Task Name',
  },
  {
    id: 'agent',
    label: 'Agent',
  },
];

export type CustomExpandableTableProps = {
  data: any;
  table: any;
}

export function CustomExpandableTable(
  {
    data,
    table,
  }: CustomExpandableTableProps) {

  const dateColumns = createDateColumns(data).map((date) => ({
    id: date,
    label: date,
  }));

  const allColumns = [...columns, ...dateColumns, { id: 'total', label: 'Total', width: '150px' }];


  const calculateDateTotals = (tasks: any[], date: string) => {
    return tasks.reduce((total, task) => {
      const dateTotal = task.agents.reduce((sum: any, agent: any) => {
        return sum + (agent.dates[date] || 0);
      }, 0);
      return total + dateTotal;
    }, 0);
  };

  return (
    <Card>
      <Box sx={{ overflowX: 'auto', position: 'relative' }}>
        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960, }}>
            <TableHead>
              <TableRow sx={{position: 'relative'}}>
                {allColumns.map((column: any, index) => (
                  <TableCell
                   sx={{
                     position: column.id === "total" ? 'sticky': 'relative',
                     color: column.id === "total" ? "primary.main" : "text.secondary",
                     right: 0,
                   }}
                  >
                    <Typography sx={{fontSize: '13px', fontWeight: 'medium',  textWrap: 'nowrap' }}>{column.label}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
                 {
                   data.map((item:any, index) => {
                     return (
                       <TableRow>
                          <TableCell>{item.country}</TableCell>
                          <TableCell sx={{flexDirection: 'row', display: 'flex', alignItems: 'center', minWidth: '140px'}}>
                            <IconButton>
                              <Iconify icon="quill:expand" />
                            </IconButton>
                            <Typography sx={{fontSize: '14px'}}>
                              {`Tasks (${item.tasks.length})`}
                            </Typography>
                          </TableCell>
                         <EmptyCell />
                         {dateColumns.map((dateColumn) => (
                           <TableCell key={dateColumn.id}>
                             <Typography sx={{fontSize: '14px'}}>
                               {calculateDateTotals(item.tasks, dateColumn.id) }
                                <Box component="span" sx={{fontSize: '12px', color: 'text.secondary'}}> hrs</Box>
                             </Typography>
                           </TableCell>
                         ))}
                          <TableCell
                            sx={{
                              backgroundColor: 'white',
                              position:  'sticky',
                              right: 0,
                            }}>
                            <Typography
                              sx={{fontSize: '14px', fontWeight: 'bold'}}>
                              {calculateTotalCountySum(item.tasks)}
                            </Typography>
                          </TableCell>
                       </TableRow>
                     )
                   })
                 }

            </TableBody>
          </Table>
        </Scrollbar>
      </Box>
    </Card>
  );
}


const EmptyCell = () => {
  return (
    <TableCell sx={{textAlign: 'center'}}>-</TableCell>
  )
}

// Helpers
// ========================================================
const calculateTotalCountySum = (tasks: any[]) => {
   let sum = 0;
    tasks.forEach((task: any) => {
      task.agents.forEach((agent: any) => {
        console.log(agent);
        Object.values(agent.dates).forEach((hours: number) => {
          sum += hours;
        })
      });
    })
  return sum;
}

// ========================================================
const createDateColumns = (data: any): string[] => {
  const dateColumns: Set<string> = new Set();
  data.forEach((item: any) => {
    item.tasks.forEach((task: any) => {
      task.agents.forEach((agent: any) => {
        Object.keys(agent.dates).forEach((date: string) => {
          dateColumns.add(date);
        });
      });
    });
  });
  return Array.from(dateColumns);
};

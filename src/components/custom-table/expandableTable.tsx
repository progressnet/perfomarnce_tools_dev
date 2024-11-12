import type { ReactNode} from "react";

import * as React from 'react';
import { useState } from "react";

import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { Box, Card, Table, alpha, TableRow, TableHead, TableCell, TableBody, Typography } from "@mui/material";

import { Iconify } from "../iconify";
import { Scrollbar } from '../scrollbar';
import {CountryFlag} from "../country-flag";
import {EmptyCell} from "../../sections/my-reports/components/empty-cell";
import {CustomSumCell, CustomHoursCell} from "../../sections/my-reports/components/custom-hours-cell";

const columns = [
  { id: 'country', label: 'Country', width: '100px' },
  { id: 'taskName', label: 'Task Name' },
  { id: 'agent', label: 'Agent' },
];

export type CustomExpandableTableProps = {
  data: any;
  table: any;
};

const countryStyles = {
  position: 'sticky',
  left: 0,
  zIndex: 1,
  width: '200px'
};
export function CustomExpandableTable({ data, table }: CustomExpandableTableProps) {
  const theme = useTheme();
  const [expandRow, setExpandRow] = useState<number | null>(null);
  const dateColumns = createDateColumns(data).map((date) => ({
    id: date,
    label: date,
  }));
  const allColumns = [...columns,{ id: 'total', label: 'Total', width: '150px' }, ...dateColumns, ];

  const handleExpandRow = (id: number) => {
    setExpandRow(expandRow === id ? null : id);
  };

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
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
            <TableHead>
              <TableRow sx={{backgroundColor: 'grey.200'}}>
                {allColumns.map((column: any, index) => (
                  <TableCell
                    key={column.id}
                  >
                    <Typography sx={{
                      fontSize: '13px', fontWeight: 'medium', whiteSpace: 'nowrap' }}>
                      {column.label}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody >
              {data.map((item: any, index: number) => {
                const isTaskExpanded = expandRow === item.id;
                return (
                  <React.Fragment key={index}>
                    <TableRow
                      sx={{
                        color: isTaskExpanded ? theme.palette.primary.main : 'inherit'
                      }}
                    >
                      <CustomTableCell isExpanded={isTaskExpanded}>
                        <Stack flexDirection="row" alignItems="center" spacing={1}>
                          <CountryFlag code={item.code} width={18}/>
                          {item.country}
                        </Stack>
                      </CustomTableCell>
                      <CustomTableCell
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          columnGap: 0.5,
                        }}
                       isExpanded={isTaskExpanded}
                      >
                          <IconButton onClick={() => handleExpandRow(item.id)}>
                            <Iconify icon={isTaskExpanded ? "mingcute:down-fill" : "mingcute:up-fill"} />
                          </IconButton>
                          <Typography sx={{ fontSize: '14px', textWrap: 'nowrap' }}>{`Tasks (${item.tasks.length})`}</Typography>
                      </CustomTableCell>
                      <EmptyCell />
                      <CustomSumCell color='#fa9805'>
                        {calculateTotalCountySum(item.tasks)}
                      </CustomSumCell>
                      {dateColumns.map((dateColumn) => (
                        <CustomHoursCell key={dateColumn.id} color='#fa9805'>
                          {calculateDateTotals(item.tasks, dateColumn.id)}
                        </CustomHoursCell>
                      ))}

                    </TableRow>
                    <ExpandableTasks item={item} expandRow={expandRow} dateColumns={dateColumns} />
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </Scrollbar>
      </Box>
    </Card>
  );
}

type ExpandableTasksProps = {
  item: any;
  expandRow: number | null;
  dateColumns: any[];
};

const ExpandableTasks = ({ item, expandRow, dateColumns }: ExpandableTasksProps) => {

  const [isAgentExpanded, setIsAgentExpanded] = useState<number | null>(null)
  const handleExpandAgent = (agentId: number | null) => {
    setIsAgentExpanded(isAgentExpanded === agentId ? null : agentId)
  }
  return (
    <>
      {item.tasks.map((task: any, taskIdx: number) => (
        item.id === expandRow && (
          <React.Fragment key={taskIdx}>
            <TableRow >
              <EmptyCell sx={countryStyles} />
              <TableCell sx={{minWidth: '200px'}}>
                <Typography sx={{ fontSize: '14px' }}>{task.taskName}</Typography>
              </TableCell>
              <TableCell sx={{textAlign: 'center'}}>
                <Stack alignItems="center"  flexDirection="row">
                  <IconButton onClick={() => handleExpandAgent(taskIdx)}>
                    <Iconify icon={taskIdx === isAgentExpanded ? "mingcute:down-fill" : "mingcute:up-fill"} />
                  </IconButton>
                  <Typography sx={{textWrap: 'nowrap', fontSize: '14px'}}> {`Agents (${task.agents.length})` }</Typography>
                </Stack>
              </TableCell>
              <CustomSumCell color='#3e63c1'>
                {task.agents.reduce((sum: number, agent: any) =>
                  sum + Object.values(agent.dates).reduce((hoursSum: number, hours: any) => hoursSum + hours, 0), 10) || 0}
              </CustomSumCell>
              {dateColumns.map((dateColumn) => (
                <CustomHoursCell key={dateColumn.id} color='#3e63c1'>
                  {task.agents.reduce((sum: number, agent: any) => sum + (agent.dates[dateColumn.id] || 0), 0) || 0}
                </CustomHoursCell>
              ))}
            </TableRow>
            {task.agents.map((agent: any, agentIdx: number) => (
               taskIdx === isAgentExpanded && (
                 <TableRow  key={`${taskIdx}-${agentIdx}`}>
                   <EmptyCell />
                   <EmptyCell />
                   <AgentCell agentName={agent.firstName} />
                   <CustomSumCell color='#ededed' textColor="black">
                     {Object.values(agent.dates).reduce((sum: number, hours: any) => sum + hours, 0)}
                   </CustomSumCell>
                   {dateColumns.map((dateColumn) => (
                       <CustomHoursCell key={dateColumn.id} color='#696a69'>
                         {agent.dates[dateColumn.id] || 0}
                       </CustomHoursCell>
                   ))}
                 </TableRow>
               )
            ))}
          </React.Fragment>
        )
      ))}
    </>
  );
};


type CustomTableCellProps = {
  children: ReactNode;
  isExpanded?: boolean;
  sx?: any;
};

const CustomTableCell = ({ children, isExpanded, sx }: CustomTableCellProps) => (
  <TableCell sx={{  color: isExpanded ? "primary.main" : "inherit", ...sx }}>{children}</TableCell>
);

// Helpers
const calculateTotalCountySum = (tasks: any[]) => {
  let sum = 0;
  tasks.forEach((task: any) => {
    task.agents.forEach((agent: any) => {
      Object.values(agent.dates).forEach((hours: any) => {
        sum += hours;
      });
    });
  });
  return sum;
};

const createDateColumns = (data: any): string[] => {
  const dateColumns: Set<string> = new Set();
  data.forEach((item: any) => {
    item.tasks.forEach((task: any) => {
      task.agents.forEach((agent: any) => {
        Object.keys(agent.dates).forEach((date: string) => {
          console.log({date})
          dateColumns.add(date);
        });
      });
    });
  });
  return Array.from(dateColumns);
};



export const AgentCell = ({ agentName }: { agentName: string }) => {
    const theme = useTheme();
    return (
      <TableCell>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 0.5,
            backgroundColor: alpha(theme.palette.success.main, 0.2),
            border: 1,
            borderColor: 'success.main',
            borderRadius: '6px',
            padding: 0.5,
          }}>
            <Iconify sx={{color: 'green'}} icon="ic:round-person"  width={20}/>
            <Typography sx={{fontSize: '13px', textWrap: 'nowrap', color: 'green'}}>{agentName}</Typography>
          </Box>
      </TableCell>
    )
}

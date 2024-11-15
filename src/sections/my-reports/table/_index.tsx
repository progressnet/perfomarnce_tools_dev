import dayjs from "dayjs";
import { useState, Fragment, useCallback} from "react";

import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import {Box, Card, Table, TableRow, TableBody, Typography} from "@mui/material";

import {TableLevel} from "./table-level";
import {TableSumCell} from "./table-sum-cell";
import {TableFlexCell} from "./table-flex-cell";
import {TableDatesRow} from "./table-dates-row";
import {CustomTableHeader} from "./table-header";
import {TableHoursCell} from "./table-hours-cell";
import {ExpandableRow} from "./table-expanded-row";
import {FiltersProps, TableFiltersRow} from "./table-filters-row";
import {TableCellCountry} from "./table-cell-country";
import {Scrollbar} from "../../../components/scrollbar";
import {CELL_BORDER_RIGHT, CELL_BOX_SHADOW} from "../config";
import {createDateColumns} from "../utils/create-date-columns";

import type { IDateColumn, ISummaryData} from "./_types";
//
export type MyReportsTableProps = {
  data: ISummaryData;
  table: any;
};
//
type ExpandKeys = 'country' | 'entity' | 'masterProcess' | 'subProcess' | 'task' | 'agent';
type ExpandState = { [key in ExpandKeys]: string | number | null };

//
const CELL_COLORS = {
  country: '#fa9805',       // Orange (for country)
  entity: '#4caf50',        // Green (for entity)
  masterProcess: '#1976d2', // Blue (for master process)
  subProcess: '#ff4081',    // Pink (for sub process)
  task: '#9c27b0',          // Purple (for task)
  agent: '#00bcd4',         // Teal (for agent)
}

// ====================================================================================================
export function MyReportsTable(
  {
    data,
    table,
  }: MyReportsTableProps) {
  // ============================== state =========================================
  const [open, setOpen] = useState(false);
  const [dateValues, setDateValues] = useState<{ start: string , end: string  }>({ start: dayjs().format('YYYY-MM-DD'), end: dayjs().format('YYYY-MM-DD') });
  const [level, setLevel] = useState<ExpandKeys>('country');
  const [expand, setExpand] = useState<ExpandState>({
    country: null,
    entity: null,
    masterProcess: null,
    subProcess: null,
    task: null,
    agent: null,
  });
  //
  const [filter, setFilter] = useState<FiltersProps>({
    start: dayjs().format('YYYY-MM-DD'),
    end:  dayjs().format('YYYY-MM-DD'),
    process: null,
    subprocess: null,
    entity: null,
    country: null,
    task: null,
  });
  // ===============================================================================
  const handleFilter = useCallback((type: string, value: {id:number, name: string}) => {
    if(type === 'process') {
      setFilter((prev) => ({
        ...prev,
        process: value,
        subprocess: null,
        task: null,
      }));
    }
    if(type === 'subprocess') {
      setFilter((prev) => ({
        ...prev,
        subprocess: value,
        task: null,
      }));
    }
    setFilter((prev) => ({
      ...prev,
      [type]: value,
    }));

  }, [])
  // ===============================================================================
  const handleDateChange = useCallback((type: 'start' | 'end', value: string) => {
    setDateValues((prev) => ({
      ...prev,
      [type]: value,
    }));
  }, []);
  // ===============================================================================
  const handleExpanded = useCallback(
    (id: string | number | null, type: ExpandKeys) => {
      setExpand((prev) => {
        if (prev[type] === id) {
          return {
            country: type === 'country' ? null : prev.country,
            entity: type === 'country' || type === 'entity' ? null : prev.entity,
            masterProcess: type === 'country' || type === 'entity' || type === 'masterProcess' ? null : prev.masterProcess,
            subProcess: type === 'country' || type === 'entity' || type === 'masterProcess' || type === 'subProcess' ? null : prev.subProcess,
            task: type === 'country' || type === 'entity' || type === 'masterProcess' || type === 'subProcess' || type === 'task' ? null : prev.task,
            agent: type === 'country' || type === 'entity' || type === 'masterProcess' || type === 'subProcess' || type === 'task' || type === 'agent' ? null : prev.agent,
          };
        }
        setLevel(type);
        return {
          ...prev,
          [type]: id,
        };
      });
    },
    []
  );
  // ===============================================================================
  const dateColumns: IDateColumn[] = createDateColumns(data);
  // ===============================================================================
  return (
    <Box>
      {/* <Stack sx={{mb: 3}}> */}
      {/*  <TableLevel level={level} color={CELL_COLORS[level]} /> */}
      {/* </Stack> */}
      <Card>
        <TableFiltersRow
          open={open}
          setOpen={setOpen}
          filter={filter}
          handleFilter={handleFilter}
        />
        <Box sx={{overflowX: 'auto', position: 'relative'}}>
          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{minWidth: 960}}>
              <CustomTableHeader columns={dateColumns}/>
              <TableBody>
                {
                  data.map((country, index) => {
                    return (
                      <Fragment key={index}>
                        <TableRow>
                          <TableFlexCell sx={{
                            position: 'sticky',
                            top: 0,
                            zIndex: 1,
                            backgroundColor: 'white',
                            left: 0,
                            borderRight: CELL_BORDER_RIGHT,
                            boxShadow: CELL_BOX_SHADOW,
                          }}>
                            <TableCellCountry
                              color={CELL_COLORS.country}
                              code={country.code}
                              country={country.country}
                              isExpanded={expand.country === country.id}
                              handleExpanded={() => handleExpanded(country.id, 'country')}
                            />
                            <TableSumCell color={CELL_COLORS.country}>
                              {country.totalHours}
                            </TableSumCell>
                          </TableFlexCell>
                          {dateColumns.map((dateColumn, cntIndex) => {
                            const hours = country.dateHours[dateColumn.id] || 0;
                            return (
                              <TableHoursCell color={CELL_COLORS.country} key={`${country.id}-${cntIndex}`}>
                                {hours}
                              </TableHoursCell>
                            );
                          })}
                        </TableRow>
                        {country?.entities && country?.entities.map((entity, entIndex) => {
                          return (
                            <Fragment key={entIndex}>
                              <ExpandableRow
                                isExpanded={expand.country === country.id}
                                handleExpandChild={() => handleExpanded(entity.entityName, 'entity')}
                                item={entity}
                                dateColumns={dateColumns}
                                mapKey="entityName"
                                color={CELL_COLORS.entity}
                              >
                                <Typography sx={{fontSize: '12px'}}>
                                  {entity.entityName}
                                </Typography>
                              </ExpandableRow>
                              {
                                entity?.masterProcesses && entity?.masterProcesses.map((masterProcess, mpIndex) => (
                                  <Fragment key={`${masterProcess.processName}-${mpIndex}`}>
                                    <ExpandableRow
                                      key={masterProcess.processName}
                                      isExpanded={expand.entity === entity.entityName}
                                      handleExpandChild={() => handleExpanded(masterProcess.processId, 'masterProcess')}
                                      item={masterProcess}
                                      dateColumns={dateColumns}
                                      mapKey="processName"
                                      color={CELL_COLORS.masterProcess}
                                    >
                                      <Typography sx={{fontSize: '12px'}}>
                                        {masterProcess?.processName}
                                      </Typography>
                                    </ExpandableRow>
                                    {
                                      masterProcess.subProcesses &&  masterProcess.subProcesses.map((subProcess, subIndex) => (
                                        <Fragment key={`${subProcess.subProcessName}-${subIndex}`}>
                                          <ExpandableRow
                                            key={subProcess.subProcessName}
                                            isExpanded={expand.masterProcess === masterProcess.processId}
                                            handleExpandChild={() => handleExpanded(subProcess.subProcessId, 'subProcess')}
                                            item={subProcess}
                                            dateColumns={dateColumns}
                                            mapKey="subProcessName"
                                            color={CELL_COLORS.subProcess}
                                          >
                                            <Typography sx={{fontSize: '12px'}}>
                                              {subProcess.subProcessName}
                                            </Typography>
                                          </ExpandableRow>
                                          {
                                            subProcess?.tasks &&  subProcess.tasks.map((task) => (
                                              <Fragment key={task.taskId}>
                                                <ExpandableRow
                                                  isExpanded={expand.subProcess === subProcess.subProcessId}
                                                  handleExpandChild={() => handleExpanded(task.taskId, 'task')}
                                                  item={task}
                                                  dateColumns={dateColumns}
                                                  mapKey="taskName"
                                                  color={CELL_COLORS.task}
                                                >
                                                  <Typography sx={{fontSize: '12px'}}>
                                                    {task.taskName}
                                                  </Typography>
                                                </ExpandableRow>
                                                {
                                                  task?.agents && task.agents.map((agent) => (
                                                    <ExpandableRow
                                                      shouldExpand={false}
                                                      key={agent.agentId}
                                                      isExpanded={expand.task === task.taskId}
                                                      handleExpandChild={() => handleExpanded(agent.agentId, 'agent')}
                                                      item={agent}
                                                      dateColumns={dateColumns}
                                                      mapKey="lastName"
                                                      color={CELL_COLORS.agent}
                                                    >
                                                      <Typography sx={{fontSize: '12px'}}>
                                                        {agent?.lastName}
                                                      </Typography>
                                                    </ExpandableRow>
                                                  ))
                                                }
                                              </Fragment>
                                            ))
                                          }
                                        </Fragment>
                                      ))
                                    }
                                  </Fragment>
                                ))
                              }
                            </Fragment>
                          )
                        })}
                      </Fragment>
                    )
                  })
                }
              </TableBody>
            </Table>
          </Scrollbar>
        </Box>
      </Card>

    </Box>

  )
}








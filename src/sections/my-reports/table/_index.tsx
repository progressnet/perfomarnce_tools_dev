import * as React from "react";
import {useState, Fragment, useReducer, useCallback} from "react";

import Alert from "@mui/material/Alert";
import TableCell from "@mui/material/TableCell";
import {Box, Card, Table, TableRow, TableBody,  TableFooter} from "@mui/material";

import { useGetSummary } from "src/actions/summary";

import {TableSpinner} from "./table-spinner";
import {TableSumCell} from "./table-sum-cell";
import {TableFlexCell} from "./table-flex-cell";
import {CustomTableHeader} from "./table-header";
import {TableHoursCell} from "./table-hours-cell";
import {ExpandableRow} from "./table-expanded-row";
import { TableFiltersRow} from "./table-filters-row";
import {TableCellCountry} from "./table-cell-country";
import {Scrollbar} from "../../../components/scrollbar";
import { filterReducer, initialFilterState} from "../reducer";
import {createDateColumns} from "../utils/create-date-columns";
import {CELL_BOX_SHADOW, FIRST_CELL_WIDTH, CELL_BORDER_RIGHT, FIRST_COLUMN_WIDTH} from "../config";

import type {FilterAction} from "../reducer";
import type {FiltersProps} from "./table-filters-row";
import type {IDateColumn} from "../../../types/summary";


//
export type MyReportsTableProps = {
  table: any;
};
//
export type ExpandKeys = 'country' | 'entity' | 'masterProcess' | 'subProcess' | 'task' | 'agent';
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
    table,
  }: MyReportsTableProps) {
  // ============================== state =========================================
  const [open, setOpen] = useState(false);
  const [expand, setExpand] = useState<ExpandState>({
    country: null,
    entity: null,
    masterProcess: null,
    subProcess: null,
    task: null,
    agent: null,
  });
  //
  const [filter, dispatchFilter] = useReducer<React.Reducer<FiltersProps, FilterAction>>(filterReducer, initialFilterState);
  // ===============================================================================
  const {summary, summaryFilterData, isLoading, errorMessage, isError} = useGetSummary({
    startDate: filter.start,
    endDate: filter.end,
    masterProcess: filter.masterProcess,
    subProcess: filter.subProcess,
    entity: filter.entity,
    country: filter.country,
    task: filter.task,
    agent: filter.agent,
  });


  // ===============================================================================
  const handleFilter = useCallback((field: keyof FiltersProps, value: number | string) => {
    dispatchFilter({ type: 'SET_FILTER', field, value });
  }, [])

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
        return {
          ...prev,
          [type]: id,
        };
      });
    },
    []
  );
  // ===============================================================================
  const dateColumns: IDateColumn[] = createDateColumns(summary );
  const totalHoursByDate = dateColumns.map((dateColumn) =>
    summary.reduce((total, country) => {
      return total + (country.dateHours[dateColumn.id] || 0)
    } , 0)
  );


  if(isError ) {
    return (
      <Box>
        <Alert sx={{maxWidth: 500}} severity="error">{
          errorMessage
        }</Alert>
      </Box>
    )
  }

  return (
    <Box>
      <Card>
        <TableFiltersRow
          filtersData={summaryFilterData}
          open={open}
          setOpen={setOpen}
          filter={filter}
          handleFilter={handleFilter}
          dispatchFilter={dispatchFilter}
        />
        <Box sx={{overflowX: 'auto', position: 'relative'}}>
          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{minWidth: 960}}>
              <CustomTableHeader columns={dateColumns}/>
              <TableSpinner isLoading={isLoading} />
              <TableBody sx={{position: 'relative'}}>

                {
                  summary.map((country, index) => {
                    return (
                      <Fragment key={index}>
                        <TableRow>
                          <TableFlexCell sx={{
                            position: 'sticky',
                            top: 0,
                            zIndex: 1,
                            backgroundColor: 'white',
                            left: 0,
                            minWidth: FIRST_COLUMN_WIDTH,
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
                                paddingLeft={4}
                                show={expand.country === country.id}
                                isExpanded={expand.entity === entity.entityName}
                                handleExpandChild={() => handleExpanded(entity.entityName, 'entity')}
                                item={entity}
                                dateColumns={dateColumns}
                                mapKey="entityName"
                                color={CELL_COLORS.entity}
                              >
                                  {entity.entityName}
                              </ExpandableRow>
                              {
                                entity?.masterProcesses && entity?.masterProcesses.map((masterProcess, mpIndex) => (
                                  <Fragment key={`${masterProcess.processName}-${mpIndex}`}>
                                    <ExpandableRow
                                      paddingLeft={6}
                                      key={masterProcess.processName}
                                      show={expand.entity === entity.entityName}
                                      isExpanded={expand.masterProcess === masterProcess.processId}
                                      handleExpandChild={() => handleExpanded(masterProcess.processId, 'masterProcess')}
                                      item={masterProcess}
                                      dateColumns={dateColumns}
                                      mapKey="processName"
                                      color={CELL_COLORS.masterProcess}
                                    >
                                        {masterProcess?.processName}
                                    </ExpandableRow>
                                    {
                                      masterProcess?.subProcesses &&  masterProcess?.subProcesses.map((subProcess, subIndex) => (
                                        <Fragment key={`${subProcess?.subProcessName}-${subIndex}`}>
                                          <ExpandableRow
                                            paddingLeft={8}
                                            key={subProcess.subProcessName}
                                            show={expand?.masterProcess === masterProcess?.processId}
                                            isExpanded={expand.subProcess === subProcess.subProcessId}
                                            handleExpandChild={() => handleExpanded(subProcess.subProcessId, 'subProcess')}
                                            item={subProcess}
                                            dateColumns={dateColumns}
                                            mapKey="subProcessName"
                                            color={CELL_COLORS.subProcess}
                                          >
                                              {subProcess.subProcessName}
                                          </ExpandableRow>
                                          {
                                            subProcess?.tasks &&  subProcess.tasks.map((task) => (
                                              <Fragment key={task.taskId}>
                                                <ExpandableRow
                                                  paddingLeft={10}
                                                  show={expand.subProcess === subProcess.subProcessId}
                                                  isExpanded={expand.task === task.taskId}
                                                  handleExpandChild={() => handleExpanded(task.taskId, 'task')}
                                                  item={task}
                                                  dateColumns={dateColumns}
                                                  mapKey="taskName"
                                                  color={CELL_COLORS.task}
                                                >
                                                    {task.taskName}
                                                </ExpandableRow>
                                                {
                                                  task?.agents && task.agents.map((agent) => (
                                                    <ExpandableRow
                                                      paddingLeft={12}
                                                      shouldExpand={false}
                                                      key={agent.agentId}
                                                      show={expand.task === task.taskId}
                                                      handleExpandChild={() => handleExpanded(agent.agentId, 'agent')}
                                                      item={agent}
                                                      dateColumns={dateColumns}
                                                      mapKey="fullName"
                                                      color={CELL_COLORS.agent}
                                                    >
                                                        {agent?.fullName}
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
              <TableFooter sx={{
                position: 'relative'
              }}>
                <TableRow sx={{
                  backgroundColor: 'grey.100',
                }}>
                  <TableCell   sx={{
                    backgroundColor: 'grey.100',
                    borderRight: CELL_BORDER_RIGHT,
                    boxShadow: CELL_BOX_SHADOW,
                    minWidth: FIRST_COLUMN_WIDTH,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    left: 0,
                    top:0,
                    position: 'sticky',
                    fontWeight: "bold",
                    textAlign: "center"
                  }}>
                    <Box  sx={{
                      minWidth: FIRST_CELL_WIDTH,
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      columnGap: 1.4,
                    }}>
                      Total Hours
                    </Box>
                    <TableSumCell color="#1730e8">
                      {summary.reduce((total, country) => total + country.totalHours, 0)}
                    </TableSumCell>
                  </TableCell>
                  {/* =============================================================================== */}
                  {totalHoursByDate.map((total, indexTh) => (
                    <TableHoursCell color="#1730e8" key={`${total}-${indexTh}`}>
                      {total}
                    </TableHoursCell >
                  ))}
                </TableRow>
              </TableFooter>
            </Table>
          </Scrollbar>
        </Box>
      </Card>
    </Box>

  )
}








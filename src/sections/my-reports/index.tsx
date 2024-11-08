import dayjs from "dayjs";
import {useState, useEffect} from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {countries} from "../../_mock/countries";
import {Iconify} from "../../components/iconify";
import { useGetSummary} from "../../actions/summary";
import {DashboardContent} from "../../layouts/dashboard";
import {useTable} from "../../components/custom-table/use-table";
import {CustomReusableTable} from "../../components/custom-table";

import type {IReport} from "../../actions/summary";
import type {TableColumn} from "../../components/custom-table/_types";
import {summaryData} from "../../_mock/summary";
import {CustomExpandableTable} from "../../components/custom-table/expandableTable";

interface TableRow {
  firstName: string;
  lastName: string;
  timesheetDate: string;
  email: string;
  department: string;
  position: string;
  company: string;
  country: string;
  leCode: string;
  division: string;
  task: string;
  process: string;
  subProcess: string;
  hoursWorked: number;
  taskCountry: string;
  relation: string;
  parentId: number;
}




export function MySummaryView() {
  const table = useTable();
  const summary = summaryData;
  const [slicedData, setSlicedData] = useState<IReport[]>([])

  const MAX_DAYS_LENGTH = Math.max(
    ...summary.map((item) =>
      Math.max(
        ...item.tasks.map((task) =>
         Object.keys(task.totalHours).length)

      )
    ))


  console.log({MAX_DAYS_LENGTH})







  const flexProps = { flex: '1 1 auto', display: 'flex', flexDirection: 'column' };

  return (
    <DashboardContent maxWidth="xl" sx={{ ...flexProps }}>
      <CustomExpandableTable
        table={table}
        data={summary}
      />
    </DashboardContent>


  )
}

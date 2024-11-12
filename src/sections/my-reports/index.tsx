import {useState, useEffect} from "react";

import {MyReportsTable} from "./table/_index";
import {summaryData} from "../../_mock/summary";
import {DashboardContent} from "../../layouts/dashboard";
import {useTable} from "../../components/custom-table/use-table";

import type {ISummaryData} from "./table/_types";



export function MySummaryView() {
  const table = useTable();
  const summary = summaryData as ISummaryData[] ;








  const flexProps = { flex: '1 1 auto', display: 'flex', flexDirection: 'column' };

  return (
    <DashboardContent maxWidth="xl" sx={{ ...flexProps }}>
      <MyReportsTable data={summary} table={table} />
    </DashboardContent>


  )
}

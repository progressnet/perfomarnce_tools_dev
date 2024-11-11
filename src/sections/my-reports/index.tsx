import {useState, useEffect} from "react";


import {DashboardContent} from "../../layouts/dashboard";
import {useTable} from "../../components/custom-table/use-table";
import {CustomReusableTable} from "../../components/custom-table";

import type {IReport} from "../../actions/summary";
import type {TableColumn} from "../../components/custom-table/_types";
import {summaryData} from "../../_mock/summary";
import {CustomExpandableTable} from "../../components/custom-table/expandableTable";



export function MySummaryView() {
  const table = useTable();
  const summary = summaryData;








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

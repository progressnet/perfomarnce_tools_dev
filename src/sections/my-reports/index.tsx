
import {MyReportsTable} from "./table/_index";
import {tableData} from "../../_mock/summary";
import {DashboardContent} from "../../layouts/dashboard";
import {useTable} from "../../components/custom-table/use-table";





export function MySummaryView() {
  const table = useTable();
  const tableDate = tableData ;







  const flexProps = { flex: '1 1 auto', display: 'flex', flexDirection: 'column' };

  return (
    <DashboardContent maxWidth="xl" sx={{ ...flexProps }}>
      <MyReportsTable data={tableDate} table={table} />
    </DashboardContent>


  )
}

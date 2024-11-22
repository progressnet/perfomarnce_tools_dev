import {MyReportsTable} from "./table/_index";
import {DashboardContent} from "../../layouts/dashboard";
import {useTable} from "../../components/custom-table/use-table";


export function MySummaryView() {
  const table = useTable();
  const flexProps = { flex: '1 1 auto', display: 'flex', flexDirection: 'column' };

  return (
    <DashboardContent maxWidth="xl" sx={{ ...flexProps }}>
      <MyReportsTable  table={table} />
    </DashboardContent>


  )
}

import {DashboardContent} from "../../../layouts/dashboard";
import MyTaskContainer from "./container";

const flexProps = { flex: '1 1 auto', display: 'flex', flexDirection: 'column' };


export function MyTasksView() {
  return (
    <DashboardContent maxWidth="xl" sx={{ ...flexProps }}>
      <MyTaskContainer />
    </DashboardContent>
  )
}

import {DashboardContent} from "../../../layouts/dashboard";

const flexProps = { flex: '1 1 auto', display: 'flex', flexDirection: 'column' };


export function MyTasksView() {
  return (
    <DashboardContent maxWidth="xl" sx={{ ...flexProps }}>
      <h1>My Tasks</h1>
    </DashboardContent>
  )
}

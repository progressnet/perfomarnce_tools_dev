
import Stack from "@mui/material/Stack";
import {Form, Field, RHFCountrySelect} from 'src/components/hook-form';

import {useGetTaskByParent} from "../../actions/task";
import {CountrySelect} from "../../components/country-select";
import {CustomCountrySelect} from "../../components/custom-country-select";
import Typography from "@mui/material/Typography";

export function MyTasksTasksView({id}: {id: number}) {
  const {tasks} = useGetTaskByParent(id);
  console.log({tasks})
  return (
    <Stack sx={{p: 2}} spacing={2}>
      <Stack>
        <Typography>Tasks</Typography>
      </Stack>
       <Stack>
         <CustomCountrySelect
           name="country"
           label="Country"
           value={null}
           error=""
           variant="outlined"
           helperText=""
           placeholder="Select Country"

         />
       </Stack>
    </Stack>
  )
}

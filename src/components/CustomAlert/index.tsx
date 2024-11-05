import Alert from "@mui/material/Alert";


export function CustomErrorAlert({error}: {error: string}) {
  console.log({error})
   if(error) {
     return (
       <Alert severity="error">Server Error: {error}</Alert>
     )
   }
   return null
}

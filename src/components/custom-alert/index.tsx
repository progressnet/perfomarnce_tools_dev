import Alert from "@mui/material/Alert";


export function CustomErrorAlert({error}: {error: string}) {
   if(error) {
     return (
       <Alert severity="error">Server Error: {error}</Alert>
     )
   }
   return null
}

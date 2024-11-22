import Stack from "@mui/material/Stack";
import {CircularProgress} from "@mui/material";


type TableSpinnerProps = {
  isLoading: boolean;
}
export function TableSpinner({isLoading}: TableSpinnerProps) {
  if(!isLoading) return null;
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        width: '100%',
        zIndex: 20,
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        background: 'rgba(255,255,255,0.3)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
    }}>
      <CircularProgress color="success" />
    </Stack>
  )
}

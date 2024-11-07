import Stack from "@mui/material/Stack";
import { CircularProgress } from "@mui/material";

type ActivityIndicatorProps = {
  isLoading: boolean;
};

export function ActivityIndicator({isLoading}: ActivityIndicatorProps) {
  if(!isLoading) return null;
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        height: '100%',
        width: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        backdropFilter: 'blur(8px)', // Apply the blur effect here
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Optional: adds a slight overlay color
      }}
    >
      <CircularProgress />
    </Stack>
  );
}

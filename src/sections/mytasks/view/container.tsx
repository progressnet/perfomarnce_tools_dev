import Stack from "@mui/material/Stack";


export default function MyTaskContainer() {
  return (
    <Stack spacing={1} flexDirection="row"  sx={{height: '60vh', borderRadius: 2, backgroundColor: 'grey.200', p: 1}}>
      <Stack sx={{
        flex: 1,
        height: '100%',
        borderRadius: 2,
        backgroundColor: 'white',
        p: 1,
      }}>
        1
      </Stack>
      <Stack sx={{
        flex: 2,
        height: '100%',
        borderRadius: 2,
        backgroundColor: 'white',
        p: 1,
      }}>
        2
      </Stack>
    </Stack>
  )
}

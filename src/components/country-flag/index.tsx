import Box from "@mui/material/Box";

export function CountryFlag({ code, width =12 }: { code: string, width?: number }) {
  const SRC =  `https://hatscripts.github.io/circle-flags/flags/${code.toLowerCase()}.svg`
  return (
    <Box
      component="img"
      loading="lazy"
      alt={code}
      src={SRC}
      sx={{
        width: `${width}px`,
        height:`${width}px`,
        maxWidth: 'unset',
        objectFit: 'cover',
      }}
    />
  )
}

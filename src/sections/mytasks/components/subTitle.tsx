import Typography from "@mui/material/Typography";

type SubTitleProps = {
  text: string;

}

export const SubTitle = ({text}: SubTitleProps) => (
  <Typography sx={{color: "grey.500", fontSize: '14px', fontWeight: 'medium'}} >{text}</Typography>

)

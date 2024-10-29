import Typography from "@mui/material/Typography";

type SubTitleProps = {
  text: string;

}

export const SubTitle = ({text}: SubTitleProps) => (
  <Typography sx={{textWrap: 'no-wrap', color: "grey.500", fontSize: '13px', fontWeight: 'medium'}} >{text}</Typography>

)

import {useMemo} from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {paths} from "../routes/paths";
import {Label} from "../components/label";
import {Iconify} from "../components/iconify";
import {useGetProcess} from "../actions/process";
import {useGetTotal} from "../actions/sidebarQueries";
import { NavSectionProps} from "../components/nav-section";



export function useSidebarData(navData: NavSectionProps['data']): NavSectionProps['data'] {
    const {processes}  = useGetProcess();
  const {totalTasks} = useGetTotal();
  const newSidebarData = navData.map((section) => ({
    ...section,
    items: section.items.map((item) => {
      if (item.title === "My Tasks") {
        return {
            ...item,
            info: (
              <Label color="error" variant="inverted">
            {totalTasks > 99 ? `+ ${totalTasks}` : totalTasks}
          </Label>
      ),
      };
      }
      return item;
    }),
  }));

  // newSidebarData.push({
  //   subheader: "Processes",
  //   items: processes.map((process, index) => ({
  //     id: `${process.id}-${index}`,
  //     title: (
  //       <Stack
  //         flexDirection="row"
  //         alignItems="center"
  //         justifyContent="space-between"
  //         sx={{
  //         borderBottom: "1.4px dashed",
  //         borderColor: "grey.400",
  //         userSelect: "none",
  //       }}>
  //         <Stack sx={{
  //           py: 1,
  //
  //         }}>
  //           <Typography variant="subtitle2">{process.processName}</Typography>
  //           <Typography sx={{textWrap: 'no-wrap', color: "grey.500", fontSize: '12px', fontWeight: 'medium'}} >{process?.numberOfSubprocesses} Sub-Processes</Typography>
  //         </Stack>
  //         <Stack sx={{minWidth: '40px'}}>
  //           <Iconify icon="mingcute:right-fill" color="grey.500" />
  //         </Stack>
  //       </Stack>
  //
  //     ),
  //     path: `${paths.dashboard.myTasks}?id=${process.id}&processName=${encodeURIComponent(process.processName)}&numberOfSubprocesses=${process.numberOfSubprocesses}`,
  //   }))
  // })


  return useMemo(() => {
    return [...newSidebarData ]
  }, [newSidebarData])

}



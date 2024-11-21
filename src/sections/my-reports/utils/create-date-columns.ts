import dayjs from "dayjs";

import type {IDateColumn, ISummaryData} from "../../../types/summary";

export const createDateColumns = (data: ISummaryData[]): IDateColumn[] => {
  const dates: IDateColumn[] = [];
  data.forEach((country) => {
    Object.keys(country.dateHours).forEach((date) => {
      if(!dates.some((d) => d.id === date)) {
        dates.push({
          id: date,
          label: date
        });
      }
    });
  });
  dates.sort((a, b) => dayjs(a.id).unix() - dayjs(b.id).unix());
  return dates;
};

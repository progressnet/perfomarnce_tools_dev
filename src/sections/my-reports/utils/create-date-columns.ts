import {IDateColumn, ISummaryData} from "../table/_types";

export const createDateColumns = (data: ISummaryData): IDateColumn[] => {
  const dates: IDateColumn[] = [];

  data.forEach((country) => {
    Object.keys(country.dateHours).forEach((date) => {
      if (!dates.some((d) => d.id === date)) {  // Check if the date already exists in the array
        dates.push({
          id: date,
          label: date
        });
      }
    });
  });

  return dates;  // Return the array of collected date objects
};

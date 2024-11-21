import dayjs from "dayjs";

export type FiltersProps = {
  masterProcess: string | null;
  start: string; // stringDate
  end: string; // stringDate
  subProcess: number | null // id;
  entity: string | null; // name
  country: string | null; // name
  task: number | null; // id
  agent: number | null; // id

}
export type FilterAction =
  | { type: 'SET_FILTER'; field: keyof FiltersProps; value: any }
  | { type: 'RESET_FILTERS' };

export const initialFilterState: FiltersProps = {
  start: dayjs().format('YYYY-MM-DD'),
  end: dayjs().format('YYYY-MM-DD'),
  masterProcess: null,
  subProcess: null,
  entity: null,
  country: null,
  task: null,
  agent: null,
};

export const filterReducer = (state: FiltersProps, action: FilterAction): FiltersProps => {
  switch (action.type) {
    case 'SET_FILTER': {
      const { field, value } = action;
      if (field === 'country') {
        return {
          ...state,
          country: value,
          entity: null,
          masterProcess: null,
          subProcess: null,
          task: null,
          agent: null,
        };
      }
      if(field === 'entity') {
        return {
          ...state,
          entity: value,
          masterProcess: null,
          subProcess: null,
          task: null,
          agent: null,
        };
      }
      if (field === 'masterProcess') {
        return {
          ...state,
          masterProcess: value,
          subProcess: null,
          task: null,
          agent: null,
        };
      }
      if (field === 'subProcess') {
        return {
          ...state,
          subProcess: value,
          task: null,
          agent: null,
        };
      }
      if (field === 'task') {
        return {
          ...state,
          task: value,
          agent: null,
        };
      }
      if(field === 'agent') {
        return {
          ...state,
          agent: value,
        }
      }
      return { ...state, [action.field]: action.value };
    }
    case 'RESET_FILTERS': {
      return {
        ...initialFilterState,
        start: state.start,
        end: state.end,
      };
    }
    default:
      return state;
  }

}

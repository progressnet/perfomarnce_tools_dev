import dayjs from "dayjs";

export type SharedTypes = {
  country: string[]; // name
  entity: string[];
  masterProcess:string[],
  subProcess:string[],
  task: string[],
  agent: string[],
}
export type FiltersProps = SharedTypes & {
  isSubmit: boolean;
  start: string; // stringDate
  end: string; // stringDate
}
export type MapFilterProps = SharedTypes
export type FilterAction =
  | { type: 'SET_FILTER'; field: keyof FiltersProps; value: any }
  | { type: 'RESET_FILTERS' };



export const initialFilterState: FiltersProps = {
  isSubmit: false,
  start: dayjs().format('YYYY-MM-DD'),
  end: dayjs().format('YYYY-MM-DD'),
  country: [],
  entity: [],
  masterProcess:[],
  subProcess: [],
  task: [],
  agent: [],
};

export const filterReducer = (state: FiltersProps, action: FilterAction): FiltersProps => {
  switch (action.type) {

    case 'SET_FILTER': {
      const { field, value } = action;
      if (field === 'country') {
        return {
          ...state,
          country: value,
          entity: [],
          masterProcess: [],
          subProcess:  [],
          task:  [],
          agent:  [],
        };
      }
      if (field === 'entity') {
        return {
          ...state,
          entity: value,
          masterProcess: [],
          subProcess:  [],
          task:  [],
          agent:  [],
        };
      }
      if (field === 'masterProcess') {
        return {
          ...state,
          masterProcess: value,
          subProcess:  [],
          task:  [],
          agent:  [],
        };
      }
      if (field === 'subProcess') {
        return {
          ...state,
          subProcess: value,
          task:  [],
          agent:  [],
        };
      }
      if (field === 'task') {
        return {
          ...state,
          task: value,
          agent:  [],
        };
      }
      return { ...state, [action.field]: action.value };
    }

    case 'RESET_FILTERS': {
      return {
        ...initialFilterState,
        start: state.start,
        end: state.end,
        isSubmit: !state.isSubmit
      };
    }
    default:
      return state;
  }

}

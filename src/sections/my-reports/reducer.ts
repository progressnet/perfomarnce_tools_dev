import dayjs from "dayjs";

export type FiltersProps = {
  isSubmit: boolean;
  start: string; // stringDate
  end: string; // stringDate
  country: string[]; // name
  // entity: string | null; // name
  // masterProcess: string | null;
  // subProcess: number | null // id;
  // task: number | null; // id
  // agent: number | null; // id

}
export type FilterAction =
  | { type: 'SET_FILTER'; field: keyof FiltersProps; value: any }
  | { type: 'SET_SUBMIT'; field: keyof FiltersProps; value: boolean }
  | { type: 'RESET_FILTERS' };

export const initialFilterState: FiltersProps = {
  isSubmit: false,
  start: dayjs().format('YYYY-MM-DD'),
  end: dayjs().format('YYYY-MM-DD'),
  country: [],
  // masterProcess: null,
  // subProcess: null,
  // entity: null,
  // task: null,
  // agent: null,
};

export const filterReducer = (state: FiltersProps, action: FilterAction): FiltersProps => {
  switch (action.type) {

    case 'SET_FILTER': {
      const { field, value } = action;
      if (field === 'country') {
        return {
          ...state,
          country: value,
          // entity: null,
          // masterProcess: null,
          // subProcess: null,
          // task: null,
          // agent: null,
        };
      }
      // if(field === 'entity') {
      //   return {
      //     ...state,
      //     entity: value,
      //     masterProcess: null,
      //     subProcess: null,
      //     task: null,
      //     agent: null,
      //   };
      // }
      // if (field === 'masterProcess') {
      //   return {
      //     ...state,
      //     masterProcess: value,
      //     subProcess: null,
      //     task: null,
      //     agent: null,
      //   };
      // }
      // if (field === 'subProcess') {
      //   return {
      //     ...state,
      //     subProcess: value,
      //     task: null,
      //     agent: null,
      //   };
      // }
      // if (field === 'task') {
      //   return {
      //     ...state,
      //     task: value,
      //     agent: null,
      //   };
      // }
      // if(field === 'agent') {
      //   return {
      //     ...state,
      //     agent: value,
      //   }
      // }
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
    case 'SET_SUBMIT': {
      return {
        ...initialFilterState,
        start: state.start,
        end: state.end,
        isSubmit: !state.isSubmit,
      };
    }
    default:
      return state;
  }

}

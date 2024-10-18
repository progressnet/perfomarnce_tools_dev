import { RHFCode } from './rhf-code';
import { RHFRating } from './rhf-rating';
import { RHFEditor } from './rhf-editor';
import { RHFSlider } from './rhf-slider';
import { RHFTextField } from './rhf-text-field';
import {RHFSelectTask} from "./rhf-select-task";
import { RHFRadioGroup } from './rhf-radio-group';
import { RHFPhoneInput } from './rhf-phone-input';
import { RHFAutocomplete } from './rhf-autocomplete';
import {RHFSelectProcess} from "./rhf-select-process";
import { RHFCountrySelect } from './rhf-country-select';
import { RHFSwitch, RHFMultiSwitch } from './rhf-switch';
import { RHFSelect, RHFMultiSelect } from './rhf-select';
import {RHFSelectSubProcess} from "./rhf-select-subprocess";
import { RHFCheckbox, RHFMultiCheckbox } from './rhf-checkbox';
import {RHFNumericIncremental} from "./rhf-numeric-incremental";
import { RHFUpload, RHFUploadBox, RHFUploadAvatar } from './rhf-upload';
import { RHFDatePicker, RHFMobileDateTimePicker } from './rhf-date-picker';

// ----------------------------------------------------------------------

export const Field = {
  Code: RHFCode,
  Editor: RHFEditor,
  Select: RHFSelect,
  Upload: RHFUpload,
  Switch: RHFSwitch,
  Slider: RHFSlider,
  Rating: RHFRating,
  Text: RHFTextField,
  Phone: RHFPhoneInput,
  Checkbox: RHFCheckbox,
  UploadBox: RHFUploadBox,
  RadioGroup: RHFRadioGroup,
  DatePicker: RHFDatePicker,
  MultiSelect: RHFMultiSelect,
  MultiSwitch: RHFMultiSwitch,
  UploadAvatar: RHFUploadAvatar,
  Autocomplete: RHFAutocomplete,
  MultiCheckbox: RHFMultiCheckbox,
  CountrySelect: RHFCountrySelect,
  MobileDateTimePicker: RHFMobileDateTimePicker,
  // custom:
  SelectProcess: RHFSelectProcess,
  SelectSubProcess: RHFSelectSubProcess,
  SelectTask: RHFSelectTask,
  NumericIncremental: RHFNumericIncremental,
};

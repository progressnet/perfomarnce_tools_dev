import { fSub } from 'src/utils/format-time';

import {
  _id,
  _roles,
  _emails,
  _booleans,
  _fullNames,
  _descriptions,
  _phoneNumbers,
  _countryNames,
} from './assets';

// ----------------------------------------------------------------------

export const _mock = {
  id: (index: number) => _id[index],
  time: (index: number) => fSub({ days: index, hours: index }),
  boolean: (index: number) => _booleans[index],
  role: (index: number) => _roles[index],
  description: (index: number) => _descriptions[index],
  email: (index: number) => _emails[index],
  phoneNumber: (index: number) => _phoneNumbers[index],
  fullName: (index: number) => _fullNames[index],
  countryNames: (index: number) => _countryNames[index],
};

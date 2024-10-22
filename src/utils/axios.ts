import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const email =  localStorage.getItem("email");
  if (email) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${email}`;
  }
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  calendar: '/calendar',
  timesheet: '/TimesheetEntries',
  timesheetDateRange: '/TimesheetEntriesByDateRange',
  process: '/Process',
  subprocess: '/SubProcess',
  subprocessByProcess: '/SubProcessByProcessID',
  task: '/Tasks',
  taskBySubProcess: '/TaskBySubProcessID',
  auth: {
    me: '/auth/me',
    email: '/auth/email',
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
  },

};

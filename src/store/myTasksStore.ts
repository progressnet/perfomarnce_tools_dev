import { create } from 'zustand';

// Define the shape of the state
type ProcessState = {
  currentProcess: Process | null;
  currentSubProcess: SubProcess | null;
  setCurrentProcess: (process: Process | null) => void;
  setCurrentSubProcess: (subprocess: SubProcess | null) => void;
};

// Define types for Process and SubProcess if you haven't already
type Process = {
  id: number;
  name: string;
  // Add other process fields as needed
};

type SubProcess = {
  id: number;
  name: string;
  processId: number;
  // Add other subprocess fields as needed
};

const useProcessStore = create<ProcessState>((set) => ({
  currentProcess: null,
  setCurrentProcess: (process: Process | null) => set({ currentProcess: process }),
  currentSubProcess: null,
  setCurrentSubProcess: (subprocess: SubProcess | null) => set({ currentSubProcess: subprocess }),
}));


export default useProcessStore;

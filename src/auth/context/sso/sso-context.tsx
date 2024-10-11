import {createContext, useContext} from "react";

export type IUser = {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: string;
};
export type SSOContextValue = {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
};





export const SSOContext = createContext<SSOContextValue | undefined>(undefined);

export function useSSOContext() {
  const context = useContext(SSOContext);

  if (!context) {
    throw new Error('useSSOContext: Context must be used inside AuthProvider');
  }

  return context;
}
export const SSOConsumer = SSOContext.Consumer;

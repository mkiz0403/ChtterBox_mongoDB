import { createContext, useContext } from 'react';

export const chatDataContext = createContext([]);

export function useAllMessages() {
  return useContext(chatDataContext);
}

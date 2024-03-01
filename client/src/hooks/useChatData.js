import { useMemo, useState, useEffect} from 'react';
import { getData } from '../Api/ChatterApi';

export function useChatData() {
  const [allMessages, setAllMessages] = useState([]);

  // const rooms = useMemo(() => Array.from(new Set(allMessages.map((message) => message.roomname))), [allMessages]);
  const rooms = useMemo(() => 
  Array.isArray(allMessages) 
    ? Array.from(new Set(allMessages.map((message) => message.roomname))) : [],[allMessages]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getData().then(setAllMessages);
      
    }, 1000);

    return () => {
      clearInterval(intervalId);
    }
  }, []);

  return {allMessages, rooms };
}

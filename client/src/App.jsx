import { useState, useMemo } from 'react';
import './App.css';
import ChattingRoomList from './Components/ChattingRoomList';
import ChattingRoom from './Components/ChattingRoom';
import { useChatData } from './hooks/useChatData'
import { chatDataContext } from './contexts/chatDataContext'

function App() {
  const [currentPage, setCurrentPage] = useState("chattingRoomList");
  const [selectedRoom, setSelectedRoom] = useState(undefined);

  const { allMessages } = useChatData();
  

  const handleRoomNameClick = (roomname) => {
    setSelectedRoom(roomname);
    setCurrentPage("chattingRoom");
  };

  return (
      <chatDataContext.Provider value={allMessages}>
        <div>
          {currentPage === "chattingRoomList" && (
            <ChattingRoomList handleRoomNameClick={handleRoomNameClick} />
          )}
          {currentPage === "chattingRoom" && (
            <ChattingRoom 
              roomname={selectedRoom} 
              goBack={() => setCurrentPage("chattingRoomList")}
            />
          )}
          
        </div>
        </chatDataContext.Provider>
  );
}

export default App;



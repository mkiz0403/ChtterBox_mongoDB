import './ChattingRoom.css'
import { useState, useMemo} from 'react';
import AddChat from './AddChat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAllMessages } from "../contexts/chatDataContext";

export default function ChattingRoom({ goBack, roomname }) {

  const [txts, setTexts] = useState([]); 
  const allMessages = useAllMessages()
  const messages = useMemo(()=> allMessages.filter((message) => message.roomname === roomname),[roomname,allMessages]);


  const handleAddChat = (newChat) => {
    setTexts([...txts, newChat]);
  };

  return (
    <div className='chattingRoom'>
      <div className='chattingRoom__roomName'>
        <h2>{roomname}</h2>
      </div>
      <div className='chattingRoom__backButton'>
        <button onClick={goBack}>뒤로가기</button>
      </div>
      <div className='chatterBox'>
        <div className='chatterBox_information'>
          {messages.map((message) => (
            <div key={message.id}>
              <div className='chatterBox__userName'>
                <AccountCircleIcon />
                <small>{message.username}</small>
              </div>
              <div className='chatterBox__messageBox'>
                <p className='chatterBox__chatterMessage'>{message.text}</p>
              </div>
              <div className='chatterBox__messageTime'>
                <small>{message.date}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
        <AddChat roomname={roomname} onAddChat={handleAddChat}/>
    </div>
  );
}
import CreateRoom from "./CreateRoom";
import './ChattingRoomList.css';
import { useAllMessages } from "../contexts/chatDataContext";

export default function ChattingRoomList({ handleRoomNameClick }) {
  const allMessages = useAllMessages()
  const rooms = Array.isArray(allMessages) ? Array.from(new Set(allMessages.map((message) => message.roomname))):[];

  return (
    <>
      <div className='roomTitle'>
        <h2>윤구소 채팅방 리스트</h2>
      </div>
      <div className='roomBox'>
        <CreateRoom />
      </div>
      <div className='roomList'>
        {rooms.map((room) => (
          <div key={room}>
            <div className='roomList__roomName'>
              <button className='roomList__button' onClick={() => handleRoomNameClick(room)}>{room}</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
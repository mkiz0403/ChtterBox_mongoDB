import './CreateRoom.css'
import { useState } from "react";
import { postData } from "../Api/ChatterApi";

export default function CreateRoom({ onAddRoom }) {
  const [newRoom, setNewRoom] = useState({
    roomname: "",
    username: 'Taejeong',
    text: '',
  });

  const [createRoom, setCreateRoom] = useState(false);
  const [createButton , setCreateButton] = useState(true);

  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toLocaleString('ko-KR', {
    });
  };


  const onSubmit = (e) => {
    e.preventDefault();

    const newRoomData = {
      id: null,
      roomname: newRoom.roomname,
      username: newRoom.username,
      text: newRoom.text,
      date: getCurrentDate(),
    };


    postData(newRoomData)
      .then(() => {
        onAddRoom(newRoomData);
      });

    setNewRoom({
      roomname: "",
      username: 'Taejeong',
      text: '',
    });

    console.log('방이 추가됐습니다.');
  };

  const oppenCreateRoom = () => {
    setCreateRoom(!createRoom);
    setCreateButton(!createButton)
  }

  const cancelCreateRoom = () => {
    setCreateRoom(!createRoom);
    setCreateButton(!createButton)
  };



  return (
    <>
      {createButton && !createRoom &&(
        <div className='openCreatRoomBox'>
          <button onClick={oppenCreateRoom}> 새로운 방 만들기 </button>
        </div>
      )}
      
      {!createButton && createRoom && (
        <div className="createRoomBox" >
        
        <h3>새로운 채팅방을 만들어 보세요!</h3>
        
          <div>
            <div className='createRoomBox__roomName'>
              <div>
                <p>새로운 방 제목을 입력하세요.</p>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="방 제목을 입력하세요"
                  name="roomname"
                  value={newRoom.roomname}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, roomname: e.target.value })
                  }
                />
              </div>            
            </div>
            <div className='createRoomBox__message'>            
              <div>
                <p>첫 메시지를 입력하세요.</p>
              </div>
              <div>
                <input 
                  type="text"
                  placeholder="메시지를 입력하세요"
                  value={newRoom.text}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, text: e.target.value })
                  }
                />
              </div>
            </div>   
          </div>
          <div className='createRoomBox__buttonBox'>
            <button onClick={onSubmit}>방 만들기</button>
          </div>
          <div className='createRoomBox__buttonBox'>
          <button onClick={cancelCreateRoom}> 취소하기 </button>
          </div>
        </div>
      )}
    </>
  );
}


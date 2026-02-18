 

   import { useEffect } from 'react';
import './index.css';
   import io from "socket.io-client";
import { useState } from 'react';
   const socket = io.connect("http://localhost:3001")
   
 function App() {  
  
  const [room, setRoom] = useState("");  
  const [message, setMessage] = useState("");
  const [recievedMessage, setRecievedMessage] = useState(""); 

  useEffect(() => {
    socket.on('recieve_message',(data) => {
      setRecievedMessage(data.message);
    })
  },[socket])
  const sendMessage = () => {
    socket.emit("send_message",{message,room})
  };  
  
  const handleJoinRoom = () => {
    if(room !== '') socket.emit('join_room',room)
  }

  return <div className="App">
    
    <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} placeholder="room id..." />
    <button onClick={handleJoinRoom}>enter to room</button>
    <input type="text" onChange={(e) => setMessage(e.target.value)} placeholder="Message..." />
    <button onClick={sendMessage}>Send Message</button>
    {recievedMessage !== "" && <p>{recievedMessage}</p> }
  </div>    
}

export default App;

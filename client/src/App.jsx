 

   import { useEffect } from 'react';
import './index.css';
   import io from "socket.io-client";
   const socket = io.connect("http://localhost:3001")
   
 function App() {  

  useEffect(() => {
    socket.on('revieve_message',(data) => {
      alert(data.message)
    })
  },[socket])
  const sendMessage = () => {
    socket.emit("send_message",{message:'hello'})
  }; 
  return <div className="App">
    <input type="text" placeholder="Message..." />
    <button onClick={sendMessage}>Send Message</button>
  </div>    
}

export default App;

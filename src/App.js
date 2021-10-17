import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import SockJS from "sockjs-client";
// import Stomp from "stompjs"
var Stomp = require("stompjs");
function App() {
  const [state,setState] = useState({})
  useEffect(()=> {
    console.log("cdm")

  },[])
  const onSubmit = () =>{
    axios.post("http://localhost:8093/api/v1/websocket/send",{event:"SOME_TEST",content:"write from my "}).then(
        res=>console.log(res)
    ).catch(error=>console.error(error))
    onConnect();
  }
  const onConnect = () => {
    const soc = new SockJS("http://localhost:8093/mb-websocket");
    const stompClient = Stomp.over(soc);
    stompClient.connect({}, function (frame) {
      console.log("Connected: " + frame);
      stompClient.subscribe("/topic/messages", function (msg) {
        console.log("Salom", JSON.parse(msg.body));
      });
    });
  }
  return (
    <>
    Helllo

      {/*<input type="text" placeholder={"write some"}/>*/}
      <input type="submit" onClick={()=>onSubmit()}/>
      <p>1</p>
      {}
    </>
  );
}

export default App;

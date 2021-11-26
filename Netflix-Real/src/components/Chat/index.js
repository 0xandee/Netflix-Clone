import "./chat.scss";
import { to_Decrypt, to_Encrypt } from "../../services/aes256";
import { process } from "./store/actions";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
//gets the data from the action object and reducers defined earlier
function Chat({ username, roomname, socket, handleOpenMovieRecommend}) {
  console.log("socket", socket.id);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const avatar = 'https://occ-0-325-3996.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABYnnca7HCf0z4YHtIK5R8MIGCeMyodAsxBYSBmMkYHqjSw46VWWyNQirfwxT-CkbxPkp-G84Wu-iOMwGG-r9QAs.png?r=f71'

  const dispatch = useDispatch();

  const dispatchProcess = (encrypt, msg, cipher) => {
    dispatch(process(encrypt, msg, cipher));
  };

  useEffect(() => {
    socket.on("message", (data) => {
      //decypt the message
      const ans = to_Decrypt(data.text, data.username);
      dispatchProcess(false, ans, data.text);
      console.log(ans);
      let temp = messages;
      temp.push({
        userId: data.userId,
        username: data.username,
        text: ans,
      });
      setMessages([...temp]);
      console.log("[...temp]", [...temp]);
    });

    socket.on("new message", (data) => {
      //decypt the message
      // const ans = to_Decrypt(data.text, data.username);
      // dispatchProcess(false, ans, data.text);
      // console.log(ans);
      // let temp = messages;
      // temp.push({
      //   userId: data.userId,
      //   username: data.username,
      //   text: ans,
      // });
      // setMessages([...temp]);
    });
  }, [socket]);

  const sendData = () => {
    if (text !== "") {
      //encrypt the message here
      // const ans = to_Encrypt(text, username, roomname);
      socket.emit("chat", text, username, roomname);
      // socket.emit("chat", ans);
      setText("");
    }
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  console.log(messages, "mess");

  return (
    <div className="chat">
      <div className="user-name">
        <span style={{ fontSize: "1rem",fontWeight: "bold",paddingLeft: "0.5rem", paddingRight: "0.5rem"}}>Chat Box</span>
        <svg style={{cursor: "pointer"}} onClick={() => {navigator.clipboard.writeText(window.location.href)}} fill="white" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z"/></svg>
        <button
          style={{ fontSize: "1rem",fontWeight: "bold",paddingRight: "0.5rem", float: "right", borderRadius: "8px", backgroundColor: "rgb(183, 7, 16)", padding: "12px 12px", border: "none", color: 'white' }}
          onClick={handleOpenMovieRecommend}>
          Choose Movie
        </button>
      </div>
      <div className="chat-message">
        {messages.map((i) => {
          if (i.username === username) {
            return (
              <div className="message mess-right">
                <span>{i.username}</span>
                <p>{i.text}</p>
                <img className="avatar-icon right" src={avatar} alt="" />
              </div>
            );
          } else {
            return (
              <div className="message ">
                <span>{i.username}</span>
                <p>{i.text} </p>     
                <img className="avatar-icon left" src={avatar} alt="" />        
              </div>
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="send">
        <input
          style={{ color: 'white' }}
          placeholder="enter your message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendData();
            }
          }}
        ></input>
        <button onClick={sendData}>Send</button>
      </div>
    </div>
  );
}
export default Chat;
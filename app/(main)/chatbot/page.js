"use client"
import { useEffect, useState } from "react";
import Image from "next/image";

function App() {
  const [title, setTitle] = useState(null);
  const [prevChats, setPrevChats] = useState([]);
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  const getMessages = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: value,
        }),
      };

      const response = await fetch("http://localhost:8000/chatbot", options);
      const data = await response.json();
      console.log("Data received:", data);

      setMessage(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createNewChat = () => {
    setMessage("");
    setValue("");
    setTitle(null);
  };

  const handleClick = (uniqueChat) => {
    setTitle(uniqueChat);
    setMessage("");
    setValue("");
  };

  useEffect(() => {
    if (!title && value && message) {
      setTitle(value);
    }
    if (title && value && message) {
      setPrevChats((prevChats) => [
        ...prevChats,
        {
          title: title,
          role: "user",
          content: value,
        },
        {
          title: title,
          role: "assistant",
          content: message[0].content, // Access the first element of the array
        },
      ]);
    }
  }, [message, title]);

  const currentChats = prevChats.filter((chats) => chats.title === title);
  const uniqueChats = Array.from(
    new Set(prevChats.map((chats) => chats.title))
  );

  return (
    <div className="app" style={{ display: "flex" }}>
      <section className="side-bar" style={{ backgroundColor: "#f5f5f5", height: "96vh", width: "244px", display: "flex", flexDirection: "column", justifyContent: "space-between",border:"0.3px solid black" ,borderRadius: "8px"}}>
        <button onClick={createNewChat} style={{ border: "solid 0.5px rgba(255, 255, 255, 0.5)", backgroundColor: "transparent", borderRadius: "5px", padding: "10px", margin: "10px",border:"0.5px solid black"  }}>+ New Chat</button>
        <ul className="history" style={{ padding: "10px", margin: "10px", height: "100%" }}>
          {uniqueChats?.map((uniqueChat, index) => (
            <li key={index} onClick={() => handleClick(uniqueChat)} style={{ listStyleType: "none", padding: "15px 0", cursor: "pointer" }}>{uniqueChat}</li>
          ))}
        </ul>
        <nav style={{ borderTop: "solid 0.5px rgba(255, 255, 255, 0.5)", padding: "10px", margin: "10px" }}>
          <p className="made-by">Made by Fin-AI</p>
        </nav>
      </section>
      <section className="main" style={{ height: "100vh", width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", textAlign: "center" }}>
      <div className="w-full flex flex-col items-center">  
    <Image
src="/chatbot.svg"
alt="chatbot"
height={90}
width={90}
/>
<h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
Fin-AI Chatbot
</h1>
<p className="text-muted-foreground text-center text-lg mb-6">
Talk to chat bot, it's smarter than you think
</p>
</div>
        <ul className="feed" style={{ overflow: "scroll", overflowX: "hidden", width: "95%", padding: "0" }}>
          {currentChats?.map((currentChat, index) => (
            <li key={index} style={{ display: "flex", backgroundColor: "#f5f5f5", width: "100%", padding: "20px", margin: "20px 0" ,border:"0.3px solid black",borderRadius: "8px"}}>
              <p className="role" style={{fontSize: "14px", textAlign: "left", minWidth: "100px" }}>{currentChat.role}</p>
              <p style={{  fontSize: "14px", textAlign: "left" }}>{currentChat.content}</p>
            </li>
          ))}
        </ul>
        <div className="bottom-section" style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <div className="input" style={{ position: "relative", width: "100%", maxWidth: "650px" }}>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} style={{ width: "100%", border: "none", fontSize: "20px", backgroundColor: "rgba(255, 255, 255, 0.05)", padding: "12px 15px", borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.05) 0 54px 55px, rgba(0, 0, 0, 0.05) 0 -12px 30px, rgba(0, 0, 0, 0.05) 0 4px 6px, rgba(0, 0, 0, 0.05) 0 12px 3px, rgba(0, 0, 0, 0.05) 0 54px 55px" }} />
            <div id="submit" onClick={getMessages} style={{ position: "absolute", bottom: "15px", right: "0", cursor: "pointer" }}>➢</div>
          </div>
          <p className="info" style={{  fontSize: "11px", padding: "10px" }}>Fin-AI chatbot can make mistakes. Consider checking important information.</p>
        </div>
      </section>
    </div>
  );
}

export default App;

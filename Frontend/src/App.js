import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/App.css";
import Login from "./components/Login";
import Logout from "./components/Logout.js";
import NavBar from "./components/NavBar.js";
import NewRoom from "./components/NewRoom.js";
import Rooms from "./components/Rooms.js";
import Home from "./components/Home.js";
import NotFound from "./components/404.js";
import RoomDetails from "./components/RoomDetails.js";
import UpdateRoom from "./components/UpdateRoom.js";
import Profile from "./components/Profile.js";
import Table from "./components/MyUploads.js";
import BookRoom from "./components/BookRoom.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" exact Component={Home}></Route>
          <Route path="/myUploads" exact Component={Table}></Route>
          <Route path="/rooms" exact Component={Rooms}></Route>
          <Route path="/new-room" exact Component={NewRoom}></Route>
          <Route path="/profile" exact Component={Profile}></Route>
          <Route path="/Login" exact Component={Login}></Route>  
          <Route path="/logout" exact Component={Logout}></Route>  
          <Route path="/room/:id" exact Component={RoomDetails}></Route> 
          <Route path="/update-room/:id" exact Component={UpdateRoom}></Route> 
          <Route path="/bookroom/:id" exact Component={BookRoom}></Route> 
          <Route path="*" exact Component={NotFound} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

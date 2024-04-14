import React, { useEffect, useState } from "react";
import axios from "axios";
// import "../style/App.css";
import { Link } from "react-router-dom";
// function rand(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// function imgUrl() {
//   const id = rand(1, 200);
//   return `https://picsum.photos/id/${id}/1920/1080`;
// }
const Out = () => {
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/newRoom");
        setRoomData(response.data.data);

      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchData();
  }, []);
  // console.log(room._id);

  // useEffect(() => {
  //   roomData.forEach(room => {
  //     console.log(room._id);
  //   });
  // }, [roomData]);
  return (
    <>
      <h1 style={{ textAlign: "center", color: "#FF2442", textShadow: "1px 0px 1px #0f0, 0px 1px 1px #0f0, 1px 0px 1px #0f0, 0px 1px 1px #0f0", margin: "2%" }}>Available Rooms</h1>
      {roomData.map((room) => (
        <div key={room._id} className="imageBox">
          <img
            className="imageBox__img"
            src={`http://localhost:5000/uploads/${room.image}`}
            alt="House"
          />
          <div className="imageBox__content">
            <div className="imageBox__title">{room.houseName}</div>
            <span className="imageBox__text">Room Rent per Day: 💰{room.roomRent}</span>
            <div className="imageBox__text">Minimum Days to Book Rooms:{room.minDays}<br /> Maximum Days to Book Rooms:{room.maxDays} </div>
            <Link to={`/room/${room._id}`} >
             <button className="btn"> VIEW MORE DETAILS</button>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default Out;

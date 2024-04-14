import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";

const RoomDetails = () => {
  // const history = useNavigate();
  const { id } = useParams();
  const [roomDetail, setRoomDetail] = useState([]);
  // const [selectedStartDate, setSelectedStartDate] = useState("");
  // const [selectedEndDate, setSelectedEndDate] = useState("");
  // console.log(selectedEndDate);
  // console.log(selectedStartDate);
  useEffect(() => {
    const fetchroomDetail = async () => {
      try {
        axios
          .get(`http://localhost:5000/api/newRoom/${id}`)
          .then(function (response) {
            console.log(response.data.data);
            setRoomDetail(response.data.data);
            console.log(roomDetail);
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchroomDetail();
  }, [id]);

  // async function bookRoom(e) {
  //   console.log(e);
  //   try {
  //     await axios
  //       .put(`http://localhost:5000/api/bookRoom/${id}`, {
  //         selectedEndDate,
  //         selectedStartDate,
  //       })
  //       .then((res) => {})
  //       .catch();
  //   } catch {}
  // }

  return (
    <div>
      {roomDetail.map((room) => (
        <>
          <h1
            style={{
              textAlign: "center",
              color: "#FFB830",
              textShadow:
                "1px 0px 1px #000, 0px 1px 1px #000, -1px 0px 1px #000, 0px -1px 1px #000",
              margin: "2%",
            }}
          >
            {room.houseName}
          </h1>
          <div key={room._id} className="imageBox">
            <img
              className="imageBox__img"
              src={`http://localhost:5000/uploads/${room.image}`}
              alt="House"
            />
            <div className="imageBox__content">
              <div className="imageBox__title">
                {room.city},{room.state},{room.pinCode}
              </div>
              <span className="imageBox__text">
                Room Rent per Day:
                <b style={{ fontSize: "20px" }}>💰{room.roomRent} </b>
                <br />
                Maximum No. of Guests allowed per room:
                <b style={{ fontSize: "20px" }}>{room.maxGuest}</b>
              </span>
              <div className="imageBox__text">
                Minimum Days to Book Rooms:
                <b style={{ fontSize: "20px" }}>{room.minDays}</b>
                <br /> Maximum Days to Book Rooms:
                <b style={{ fontSize: "20px" }}>{room.maxDays}</b>
              </div>
              <center>
                <Link to={`/bookroom/${id}`} >
              <button className="btn">Book Room</button>
            </Link>
              </center>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default RoomDetails;

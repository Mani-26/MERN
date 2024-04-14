import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";



const UpdateRoom = (room) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [mail, setMail] = useState("guest@gmail.com");

  useEffect(() => {
    // console.log();
    const data = localStorage.getItem("email");
    if (data) {
      setMail(data);
    } else {
      setMail("guest@gmail.com");
    }
  }, []);
  // const [roomData, setRoomData] = useState({
  //   adminEmail: "",
  //   houseName: "",
  //   phone: "",
  //   street: "",
  //   city: "",
  //   state: "",
  //   country: "",
  //   pinCode: "",
  //   minDays: "",
  //   maxDays: "",
  //   roomSize: "",
  //   roomCount: "",
  //   roomRent: "",
  //   image: null,
  // });
  const [roomData, setRoomData] = useState({room});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/newRoom/${id}`
        );
        setRoomData(response.data.data);
        
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setRoomData({ ...roomData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    const updatedRoom = new FormData();
    updatedRoom.append("houseName", roomData.houseName);
    updatedRoom.append("adminEmail", mail);
    updatedRoom.append("phone", roomData.phone);
    updatedRoom.append("street", roomData.street);
    updatedRoom.append("city", roomData.city);
    updatedRoom.append("state", roomData.state);
    updatedRoom.append("country", roomData.country);
    updatedRoom.append("pinCode", roomData.pinCode);
    updatedRoom.append("minDays", roomData.minDays);
    updatedRoom.append("maxDays", roomData.maxDays);
    updatedRoom.append("roomSize", roomData.roomSize);
    updatedRoom.append("roomCount", roomData.roomCount);
    updatedRoom.append("roomRent", roomData.roomRent);
    updatedRoom.append("image", roomData.image);


    try {
      await axios.put(
        `http://localhost:5000/api/update/${id}`,
        updatedRoom,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Room data updated successfully");
      navigate("/myUploads");
    } catch (error) {
      console.error("Error updating room data:", error);
    }
  };
  return (
    <div className={`formBox`}>
      <div className={`formBoxIn`}>
        <br></br>
        <br></br>
        <h2>Update Room</h2>
        <form onSubmit={handleSubmit}>
          <div className={`input-box`}>
            <input
              name="houseName"
              type="text"
              onChange={handleChange}
              value={roomData.houseName}
              required
            />
            <label>House Name</label>
          </div>
          <div className={`input-box`}>
            <input name="phone" type="tel" autoComplete="on" onChange={handleChange} required />
            <label>Phone Number</label>
          </div>
          <div className={`input-box`}>
            <input name="street" type="text" onChange={handleChange} required />
            <label>Street</label>
          </div>
          <div className={`input-box`}>
            <input name="city" type="text" onChange={handleChange} required />
            <label>City</label>
          </div>
          <div className={`input-box`}>
            <input name="state" type="text" onChange={handleChange} required />
            <label >State</label>
          </div>
          <div className={`input-box`}>
            <input
              name="country"
              type="text" autoComplete="on"
              onChange={handleChange}
              required
            />
            <label>Country</label>
          </div>
          <div className={`input-box`}>
            <input
              name="pinCode"
              type="number"
              onChange={handleChange}
              required
            />
            <label>PinCode</label>
          </div>
          <div className={`input-box`}>
            <input
              name="minDays"
              type="number"
              min={1}
              onChange={handleChange}
              required
            />
            <label>Minimum Booking Days</label>
          </div>
          <div className={`input-box`}>
            <input
              name="maxDays"
              type="number"
              onChange={handleChange}
              required
            />
            <label>Maximum Booking Days</label>
          </div>
          <div className={`input-box`}>
            <input
              name="maxGuest"
              type="number"
              onChange={handleChange}
              required
            />
            <label>Maximum Guest(s)</label>
          </div>
          <div className={`input-box`}>
            <input
              name="roomSize"
              type="number"
              onChange={handleChange}
              required
            />
            <label>Room Size</label>
          </div>
          <div className={`input-box`}>
            <input
              name="roomCount"
              type="number"
              onChange={handleChange}
              required
            />
            <label>Number of Rooms Available</label>
          </div>
          <div className={`input-box`}>
            <input
              name="roomRent"
              type="number"
              min={1}
              onChange={handleChange}
              required
            />
            <label>Rent per Day</label>
          </div>
          <div className={`input-box`}>
            <span id="fileReset">
              <input
                name="image"
                type="file"
                onChange={handleFileChange}
                required
              />
              <input
                type="reset"
                className="reset"
                value={"Reset Form"}
                name="reset"
              />
            </span>
          </div>
          <button type="submit" className={`btn `}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRoom;


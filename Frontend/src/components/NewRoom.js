import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Form() {
  const navigate = useNavigate();
  const [mail, setMail] = useState(false);
  const [role, setRole] = useState(false);
  useEffect(() => {
    const data = localStorage.getItem("email");
    if (data) {
      setMail(data);
    } else {
      setMail("Login Required");
    }
  }, []);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) {
      setRole(role);
    } else {
      setRole("Login Required");
    }
  }, []);

  const [roomData, setFormData] = useState({
    adminEmail: "",
    houseName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    minDays: "",
    maxDays: "",
    roomSize: "",
    roomCount: "",
    roomRent: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...roomData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...roomData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const room = new FormData();
    room.append("houseName", roomData.houseName);
    room.append("adminEmail", mail);
    room.append("phone", roomData.phone);
    room.append("street", roomData.street);
    room.append("city", roomData.city);
    room.append("state", roomData.state);
    room.append("country", roomData.country);
    room.append("pinCode", roomData.pinCode);
    room.append("minDays", roomData.minDays);
    room.append("maxDays", roomData.maxDays);
    room.append("roomSize", roomData.roomSize);
    room.append("roomCount", roomData.roomCount);
    room.append("maxGuest", roomData.maxGuest);
    room.append("roomRent", roomData.roomRent);
    room.append("image", roomData.image);

    try {
      console.log(mail);
      if (localStorage.getItem("isUser") === "false") {
        alert("You need to be Logged in Before uploading new rooms");
        navigate("/login");
      } else if (role === "user") {
        alert(
          "You need to be an House owner to upload new rooms \nIt seems you are signed in as USER \nTry creating an ADMIN account "
        );
        navigate("/login");
      } else {
        await axios.post("http://localhost:5000/api/newRoom", room, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Form data submitted successfully");
        alert("Uploaded");
        navigate("/myUploads");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };
  return (
    <div className={`formBox`}>
      <div className={`formBoxIn`}>
        <br></br>
        <br></br>
        <h2>Upload New Room</h2>
        <form onSubmit={handleSubmit}>
          <div className={`input-box`}>
            <input
              name="houseName"
              type="text"
              onChange={handleChange}
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
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyUploads = () => {
    const navigate = useNavigate();
    const [roomData, setRoomData] = useState([]);
    const filt = localStorage.getItem("email");
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

    const handleDelete = async (roomId) => {
        try {
            await axios.delete(`http://localhost:5000/api/delete/${roomId}`);
            // Update the roomData state after deletion
            setRoomData((prevData) => prevData.filter((room) => room._id !== roomId));
            console.log("Room deleted successfully");
        } catch (error) {
            console.error("Error deleting room:", error);
        }
    };


    return (
        <table className="rwd-table">
            <tbody>
                <tr>
                    <th>House Name</th>
                    <th>minDays</th>
                    <th>maxDays</th>
                    <th>roomRent</th>
                    <th>roomSize</th>
                    <th>roomCount</th>
                    <th>Image</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
                {roomData.filter((room) => room.adminEmail === filt).map(room => (
                    <tr key={room._id} >
                        <td data-th="houseName">{room.houseName}</td>
                        <td data-th="minDays">{room.minDays}</td>
                        <td data-th="maxDays">{room.maxDays}</td>
                        <td data-th="roomRent">{room.roomRent}</td>
                        <td data-th="roomSize">{room.roomSize}</td>
                        <td data-th="roomCount">{room.roomCount}</td>
                        <td data-th="image"><img src={`http://localhost:5000/uploads/${room.image}`} height={60} width={100} alt="house" />
                        </td>
                        <td data-th="update">
                            <button onClick={() => navigate(`/update-room/${room._id}`)} className={`btn `} style={{borderRadius:"20px",width:"100px"}}>Update</button>
                        </td>
                        <td data-th="delete">
                            <button onClick={() => handleDelete(room._id)} className={`btn `} style={{borderRadius:"20px",width:"100px"}}>Delete</button>
                        </td>
                    </tr>))}
            </tbody>
        </table>
    );
};

export default MyUploads;

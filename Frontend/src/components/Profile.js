import { useState } from "react";
import photo from "../assets/avatar.png";

function Profile() {
    const [name, setName] = useState("Guest")
    const [email, setMail] = useState("guest@gmail.com")
    const [role, setRole] = useState("Guest@123")
    let mail = localStorage.getItem("email")

    fetch("http://localhost:5000/api/profil", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: mail }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                setName(data.data.username);
                setMail(data.data.email);
                setRole(data.data.role);
                // console.log('Username:', username);
            } else {
                console.error(data.message);
            }
        })
        .catch((error) => console.error('Error fetching user data:', error));
    return (
        <div className="imageBox">
            <img
                className="imageBox__img"
                src={photo}
                alt="profile"
            />
            <div className="imageBox__content">
                <div className="imageBox__title">Name: {name}</div>
                <div className="imageBox__text">Email id: {email}<br />Role: {role} </div>
            </div>
        </div>
    )
}
export default Profile;
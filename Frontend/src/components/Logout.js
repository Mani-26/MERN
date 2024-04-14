
// import Home from "./Home.js";
import {useNavigate } from "react-router-dom";
function Logout() {
    const navigate = useNavigate();
    localStorage.setItem("isUser", "false");
    localStorage.setItem("email", "guest");
    localStorage.setItem("role", "guest");
    setTimeout(() => {
        navigate("/");
    window.location.reload();
    }, 800);
    return null;
}

export default Logout;

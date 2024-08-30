// import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const BookRoom = () => {
  // const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleShowConfirmation = () => {
    Swal.fire({
      title: "Confirm Booking",
      text: "Are you sure you want to book the room?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, book it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    });
  };

  return (
    <div>
      <div id="booking" className="section">
        <div className="section-center">
          <div className="container">
            <div className="row">
              <div className="booking-form">
                <div className="form-header">
                  <center>
                    <h1
                      style={{
                        textShadow:
                          "1px 0px 1px #000, -1px 0px 1px #000, 0px 1px 1px #000, 0px -1px 1px #000",
                      }}
                    >
                      Make your reservation
                    </h1>
                  </center>
                </div>
                <form>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Your Name"
                      required
                    />
                    <span>Your Name</span>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input className="form-control" type="date" required />
                        <span className="form-label">Check In</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input className="form-control" type="date" required />
                        <span className="form-label">Check out</span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          required
                          placeholder="No of Rooms"
                        />
                        <span>Rooms needed</span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          required
                          placeholder="No of Adults"
                        />
                        <span>Adults Count</span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          required
                          placeholder="No of Childrens"
                        />
                        <span>Childrens Count</span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="email"
                          required
                          placeholder="Enter your Email"
                        />
                        <span className="form-label">Email</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="tel"
                          required
                          placeholder="Enter you Phone"
                        />
                        <span className="form-label">Phone</span>
                      </div>
                    </div>
                  </div>
                  <div className="form-btn">
                    <button
                      className="btn"
                      type="button"
                      onClick={handleShowConfirmation}
                    >
                      Book Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookRoom;

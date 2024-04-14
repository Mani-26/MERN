const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema({
  adminEmail: String,
  houseName: String,
  phone: Number,
  street: String,
  city: String,
  state: String,
  country: String,
  pinCode: Number,
  minDays: Number,
  maxDays: Number,
  maxGuest: Number,
  roomSize: Number,
  roomCount: Number,
  roomRent: Number,
  roomLeft: Number,
  image: String,
  selectedStartDate: String,
  selectedEndDate: String,
  bookedDates: Array,
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;

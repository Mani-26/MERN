const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const app = express();
const path = require("path");
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const Credential = require("./src/models/mongo");
const Room = require("./src/models/roomModel");

mongoose.connect("mongodb://localhost:27017/casanest");

const storage = multer.diskStorage({
  destination: "./data",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });


app.post("/api/newroom", upload.single("image"), async (req, res) => {
  try {
    const {
      adminEmail,
      houseName,
      phone,
      street,
      city,
      state,
      country,
      pinCode,
      minDays,
      maxDays,
      maxGuest,
      roomSize,
      roomCount,
      roomRent,
    } = req.body;
    const image = req.file.filename;

    const roomData = new Room({
      adminEmail,
      houseName,
      phone,
      street,
      city,
      state,
      country,
      pinCode,
      minDays,
      maxDays,
      maxGuest,
      roomSize,
      roomCount,
      roomRent,
      image,
    });
    await roomData.save();
    res
      .status(200)
      .json({ success: true, message: "Form data saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.use("/uploads", express.static(path.join(__dirname, "data")));

app.put("/api/update/:id", upload.single("image"), async (req, res) => {
  try {
    const id = req.params.id;
    const {
      adminEmail,
      houseName,
      phone,
      street,
      city,
      state,
      country,
      pinCode,
      minDays,
      maxDays,
      maxGuest,
      roomSize,
      roomCount,
      roomRent,
    } = req.body;
    const image = req.file.filename;

    const updatedRoom = {
      adminEmail,
      houseName,
      phone,
      street,
      city,
      state,
      country,
      pinCode,
      minDays,
      maxDays,
      maxGuest,
      roomSize,
      roomCount,
      roomRent,
      image,
    };

    const result = await Room.findByIdAndUpdate(id, updatedRoom, {
      new: true,
      omitUndefined: true,
    });

    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Error updating room:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});


app.get("/api/newroom", async (req, res) => {
  try {
    const roomData = await Room.find();
    res.status(200).json({ success: true, data: roomData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/api/newroom/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const roomData = await Room.find({ _id: id });
    res.status(200).json({ success: true, data: roomData });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


app.delete("/api/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Room.findByIdAndDelete(id);

    if (!result) {
      res.status(404).json({ success: false, message: "Room not found" });
    } else {
      res.json({ success: true, message: "Room deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});


app.put("/api/bookRoom/:id", async(req,res)=>{
  const id=req.params.id;
  try {
    const {
      selectedEndDate,
      selectedStartDate,
    } = req.body;

    const updatedRoom = {
      selectedEndDate:selectedEndDate,
      selectedStartDate:selectedStartDate,
    };

    const result = await Room.findByIdAndUpdate(id, updatedRoom, {
      new: true,
      omitUndefined: true,
    });

    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Error updating room:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});


app.post('/api/profil', async (req, res) => {
  try {
    const userEmail = req.body.email;
    const user = await Credential.findOne({ email: userEmail });

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
    } else {
      res.status(200).json({ success: true, data: user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email.trim() === "" || password.trim() === "") {
      res.json("incomplete");
    } else {
      const user = await Credential.findOne({ email: email });
      if (user) {
        if (password === user.password) {
          if (user.role === "owner") {
            res.json("owner");
          } else {
            res.json("user");
          }
        } else {
          res.json("wrongPassword");
        }
      } else {
        res.json("notexist");
      }
    }
  } catch (e) {
    console.log(e);
  }
});




app.post("/signup", async (req, res) => {
  const { username, email, password, role } = req.body;

  const data = {
    username: username,
    email: email,
    password: password,
    role: role,
  };

  try {
    if (username.trim() === "" || email.trim() === "" || password.trim() === "") {
      res.json("incomplete");
    } else {
      const user = await Credential.findOne({ email: email });
      if (user) {
        res.json("exist");
      } else {
        if (role === "owner") {
          res.json("owner");
        } else if (role === "user") {
          res.json("user");
        }
        await Credential.insertMany([data]);
      }
    }
  } catch (e) {
    console.error(e);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

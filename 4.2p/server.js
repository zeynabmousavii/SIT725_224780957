const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/locateSocketDB");

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// schema
const stationSchema = new mongoose.Schema({
  stationName: {
    type: String,
    required: true,
    minlength: 3,
  },
  suburb: {
    type: String,
    required: true,
  },
  chargerType: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  pricePerKwh: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    required: true,
  },
});

const Station = mongoose.model("Station", stationSchema);

// GET all stations
app.get("/api/stations", async (req, res) => {
  try {
    const stations = await Station.find({});
    res.json({
      statusCode: 200,
      data: stations,
      message: "Stations fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Failed to fetch stations",
    });
  }
});

// POST new station
app.post("/api/stations", async (req, res) => {
  try {
    const { stationName, suburb, chargerType, availability, pricePerKwh, image } = req.body;

    const newStation = new Station({
      stationName,
      suburb,
      chargerType,
      availability,
      pricePerKwh,
      image,
    });

    await newStation.save();

    res.status(201).json({
      statusCode: 201,
      message: "Station added successfully",
      data: newStation,
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
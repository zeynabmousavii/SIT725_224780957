const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/locateSocketDB");

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

const sampleStations = [
  {
    stationName: "ChargePoint Central",
    suburb: "Burwood",
    chargerType: "Fast Charger",
    availability: "Available",
    pricePerKwh: 0.45,
    image: "images/station1.jpg",
  },
  {
    stationName: "EcoPlug Hub",
    suburb: "Essendon",
    chargerType: "Standard Charger",
    availability: "Busy",
    pricePerKwh: 0.35,
    image: "images/station2.jpg",
  },
  {
    stationName: "GreenVolt Station",
    suburb: "Footscray",
    chargerType: "Ultra Fast Charger",
    availability: "Available",
    pricePerKwh: 0.55,
    image: "images/station3.jpg",
  },
];

async function seedDatabase() {
  try {
    await Station.deleteMany({});
    await Station.insertMany(sampleStations);
    console.log("Sample stations inserted successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
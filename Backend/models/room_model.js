import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  building: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Building", // each room belongs to one building
    required: true,
  },
  roomNumber: {
    type: String,
    required: [true, "Room number is required"],
  },
  rent: {
    type: Number,
    required: [true, "Rent price is required"],
  },
  available: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    enum: ["single", "double", "family", "suite"],
    default: "single",
  },
  description: {
    type: String,
  },
  images: [String], // list of image URLs
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Room = mongoose.model("Room", roomSchema);

export default Room;

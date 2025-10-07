// import mongoose from "mongoose";

// const buildingSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Building name is required"],
//     trim: true,
//   },
//   address: {
//     street: String,
//     city: String,
//     state: String,
//     pincode: String,
//   },
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User", // linked to User model
//     required: true,
//   },
//   description: {
//     type: String,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Building = mongoose.model("Building", buildingSchema);

// export default Building;

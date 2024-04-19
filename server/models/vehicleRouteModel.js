const mongoose = require("mongoose");
const vehicleRouteSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    name: {
      type: String,
      required: [true, "Please add a route name"],
    },
    vehicleNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: [true, "Please add a vehicle number"],
    },
    totalDistance: {
      type: Number,
    },
    routeStartPlace: {
      type: String,
      required: [true, "Please add a route start place"],
    },
    routeStopPlace: {
      type: String,
      required: [true, "Please add a route end place"],
    },
  },
  { timestamps: true }
);

const VehicleRoute = mongoose.model("VehicleRoute", vehicleRouteSchema);

module.exports = VehicleRoute;

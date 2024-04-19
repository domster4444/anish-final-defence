const mongoose = require("mongoose");

const vehicleRouteStopsSchema = new mongoose.Schema({
  route: {
    type: String,
    required: true,
  },
  schedule: [
    {
      pickupPoint: {
        type: String,
        required: true,
      },
      pickUpTime: {
        type: Date,
        required: true,
      },
      dropTime: {
        type: Date,
        required: true,
      },
      monthlyFee: {
        type: Number,
        required: true,
      },
    },
  ],
});

const VehicleRouteStops = mongoose.model("VehicleRouteStops", vehicleRouteStopsSchema);

module.exports = VehicleRouteStops;

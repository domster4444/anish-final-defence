const mongoose = require("mongoose");
const schedule = require("node-schedule");

const emailQuotaSchema = new mongoose.Schema(
  {
    noOfEmailSent: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

emailQuotaSchema.methods.resetEmailCountIfNeeded = function () {
  const currentTime = new Date();
  const lastUpdated = this.updatedAt || this.createdAt;

  if (currentTime - lastUpdated > 24 * 60 * 60 * 1000) {
    this.noOfEmailSent = 0;
  }
};

const EmailQuota = mongoose.model("SchoolEmailQuota", emailQuotaSchema);

// Schedule a job to run every 24 hours
schedule.scheduleJob("0 0 * * *", async function () {
  try {
    // Find all instances of EmailQuota and reset the email count if needed
    const emailQuotas = await EmailQuota.find();
    for (const emailQuota of emailQuotas) {
      emailQuota.resetEmailCountIfNeeded();
      await emailQuota.save();
    }
  } catch (error) {
    console.error("Error resetting email counts:", error);
  }
});

module.exports = EmailQuota;

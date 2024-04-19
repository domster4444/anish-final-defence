const mongoose = require("mongoose");
const achievementCertificateDesignSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    design: {
      type: String,
    },
  },
  { timestamps: true }
);

const AchievementCertificateDesign = mongoose.model("AchievementCertificateDesign", achievementCertificateDesignSchema);

module.exports = AchievementCertificateDesign;

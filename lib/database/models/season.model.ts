import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for Season
export interface ISeason extends Document {
  _id: string;
  type: string;
  crowd: string;
  surfingLevel: string[];
  months: string[];
}

// Check if the model is already defined
const SeasonSchema: Schema = new Schema({
  type: { type: String, required: true, enum: ["High", "Low"] },
  crowd: { type: String, required: true, enum: ["Low", "Medium", "High"] },
  surfingLevel: {
    type: [String],
    required: true,
    enum: ["Beginner", "Intermediate", "Advanced"],
  },
  months: {
    type: [String],
    required: true,
    enum: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
});

const Season: Model<ISeason> =
  mongoose.models.Season || mongoose.model<ISeason>("Season", SeasonSchema);

export default Season;

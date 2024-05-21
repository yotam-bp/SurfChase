import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for Location
export interface ILocation extends Document {
  name: string;
  country: string;
  region: string;
  spots: mongoose.Types.ObjectId[];
  budget: string;
  season: mongoose.Types.ObjectId;
  monthlyTemperatures: mongoose.Types.ObjectId; // Reference to a MonthlyTemperature document
}

// Schema for Location
const LocationSchema: Schema = new Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  region: { type: String, required: true },
  spots: [{ type: Schema.Types.ObjectId, ref: 'Spot', required: true }],
  budget: { type: String, required: true },
  season: { type: Schema.Types.ObjectId, ref: 'Season', required: true },
  monthlyTemperatures: { type: Schema.Types.ObjectId, ref: 'MonthlyTemperature', required: true }
});

// Create the Location model
const Location: Model<ILocation> = mongoose.models.Location || mongoose.model<ILocation>('Location', LocationSchema);

export default Location;

import mongoose, { Schema, Document, Model } from 'mongoose';
import { ISeason } from './season.model';
import { IMonthlyTemperature } from './monthlyTemperature.model';
import { ISpot } from './spot.model';

// Interface for Location
export interface ILocation extends Document {
  _id: string;
  name: string;
  country: string;
  region: string;
  spots: ISpot[];
  budget: string;
  seasons: ISeason[];
  monthlyTemperatures: IMonthlyTemperature; 
  imageUrl:string;
}

// Schema for Location
const LocationSchema: Schema = new Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  region: { type: String, required: true },
  spots: [{ type: Schema.Types.ObjectId, ref: 'Spot', required: true }],
  budget: { type: String, required: true },
  seasons: [{ type: Schema.Types.ObjectId, ref: 'Season', required: true }],
  monthlyTemperatures: { type: Schema.Types.ObjectId, ref: 'MonthlyTemperature', required: true },
  imageUrl: { type: String, required: true },
});

// Create the Location model
const Location: Model<ILocation> = mongoose.models.Location || mongoose.model<ILocation>('Location', LocationSchema);

export default Location;

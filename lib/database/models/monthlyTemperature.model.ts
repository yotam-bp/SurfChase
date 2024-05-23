import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for a single monthly temperature
interface IMonthlyTemperatureEntry extends Document {
  _id: string;
  month: string;
  seaTemperature: number;
  outsideTemperature: number;
}

// Interface for the MonthlyTemperature document that holds an array of monthly temperatures
export interface IMonthlyTemperature extends Document {
  entries: IMonthlyTemperatureEntry[];
}

// Schema for a single monthly temperature
const MonthlyTemperatureEntrySchema: Schema = new Schema({
  month: { type: String, required: true },
  seaTemperature: { type: Number, required: true },
  outsideTemperature: { type: Number, required: true },
});

// Schema for MonthlyTemperature document
const MonthlyTemperatureSchema: Schema = new Schema({
  entries: { type: [MonthlyTemperatureEntrySchema], required: true },
});

// Create the MonthlyTemperature model
const MonthlyTemperature: Model<IMonthlyTemperature> = mongoose.models.MonthlyTemperature || mongoose.model<IMonthlyTemperature>('MonthlyTemperature', MonthlyTemperatureSchema);

export default MonthlyTemperature;

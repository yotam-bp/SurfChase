import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for Spot
export interface ISpot extends Document {
  name: string;
}

// Check if the model is already defined
const SpotSchema: Schema = new Schema({
  name: { type: String, required: true },
});

const Spot: Model<ISpot> = mongoose.models.Spot || mongoose.model<ISpot>('Spot', SpotSchema);

export default Spot;

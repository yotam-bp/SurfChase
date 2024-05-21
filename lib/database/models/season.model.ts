import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for Season
export interface ISeason extends Document {
  type: string; // High or Low season
  crowd: string; // Low, Medium, High
  surfingLevel: string[]; // ['Beginner', 'Intermediate', 'Advanced']
}

// Check if the model is already defined
const SeasonSchema: Schema = new Schema({
  type: { type: String, required: true, enum: ['High', 'Low'] },
  crowd: { type: String, required: true, enum: ['Low', 'Medium', 'High'] },
  surfingLevel: { type: [String], required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] }
});

const Season: Model<ISeason> = mongoose.models.Season || mongoose.model<ISeason>('Season', SeasonSchema);

export default Season;

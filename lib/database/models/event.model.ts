import { Document, Schema, model, models } from "mongoose";
import { IUser } from "./user.model";

export interface IEvent extends Document {
  _id: string;
  title: string;
  // description?: string;
  // location?: string;
  // createdAt: Date;
  // imageUrl: string;
  // startDateTime: Date;
  // endDateTime: Date;
  // price: string;
  // isFree: boolean;
  // url?: string;
  surfingLevel: string;
  budget: string;
  waterTemp: string;
  monthToTravel:string;
  category: { _id: string, name: string }
  organizer: IUser
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  // description: { type: String },
  // location: { type: String },
  // createdAt: { type: Date, default: Date.now },
  // imageUrl: { type: String, required: true },
  // startDateTime: { type: Date, default: Date.now },
  // endDateTime: { type: Date, default: Date.now },
  // price: { type: String },
  // isFree: { type: Boolean, default: false },
  // url: { type: String },
  surfingLevel: { type: String, required: true },
  budget: { type: String, required: true },
  waterTemp: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  organizer: { type: Schema.Types.ObjectId, ref: 'User' },
  monthToTravel:{ type: String, required: true },
})

const Event = models.Event || model('Event', EventSchema);

export default Event;
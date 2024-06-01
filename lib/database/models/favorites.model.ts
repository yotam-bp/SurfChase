import mongoose, { Schema, Document, Model } from 'mongoose';
import { ILocation } from './locations.model';
import { IUser } from './user.model'; // Assuming there's a User model

// Interface for Favorite
export interface IFavorite extends Document {
  user: IUser;
  location: ILocation;
}

// Schema for Favorite
const FavoriteSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
});

// Create the Favorite model
const Favorite: Model<IFavorite> = mongoose.models.Favorite || mongoose.model<IFavorite>('Favorite', FavoriteSchema);

export default Favorite;

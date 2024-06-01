'use server'

import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/database'
import Favorite from '@/lib/database/models/favorites.model'
import Location from '@/lib/database/models/locations.model'
import { handleError } from '@/lib/utils'

// GET ALL FAVORITES
export async function getAllFavorites(userId: string) {
  try {
    await connectToDatabase()
    const favorites = await Favorite.find({ user: userId }).populate('location')
    
    return JSON.parse(JSON.stringify(favorites))
  } catch (error) {
    handleError(error)
  }
}

// ADD TO FAVORITES
export async function addToFavorites(userId: string, locationId: string, path: string) {
  try {
    await connectToDatabase()
    
    const location = await Location.findById(locationId)
    if (!location) throw new Error('Location not found')

    const existingFavorite = await Favorite.findOne({ user: userId, location: locationId })
    if (existingFavorite) throw new Error('Location already in favorites')

    const favorite = await Favorite.create({ user: userId, location: locationId })
    revalidatePath(path)
    return JSON.parse(JSON.stringify(favorite))
  } catch (error) {
    handleError(error)
  }
}

// DELETE FROM FAVORITES
export async function deleteFromFavorites(userId: string, locationId: string, path: string) {
  try {
    await connectToDatabase()
    
    const favorite = await Favorite.findOneAndDelete({ user: userId, location: locationId })
    if (!favorite) {
      console.error(`Favorite not found for user: ${userId} and location: ${locationId}`); // Add detailed logging
      throw new Error('Favorite not found')
    }

    revalidatePath(path)
    return { message: 'Favorite deleted successfully' }
  } catch (error) {
    handleError(error)
  }
}



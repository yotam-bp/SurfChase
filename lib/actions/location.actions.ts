import { getAllLocationsParams } from "@/types";
import { connectToDatabase } from "../database";
import Season from "../database/models/season.model";
import Spot from "../database/models/spot.model";
import { handleError } from "../utils";
import Location from "../database/models/locations.model";
import MonthlyTemperature from "../database/models/monthlyTemperature.model";

const populateLocation = (query: any) => {
        return query
          .populate({ path: 'seasons', model: Season, select: '_id type crowd surfingLevel months ' })
          .populate({ path: 'spots', model: Spot, select: '_id name' })
          .populate({ path: 'monthlyTemperatures', model: MonthlyTemperature, select: '_id entries' })

      }

      export async function getLocationIdById(locationId: string) {
  
        try {
          await connectToDatabase()
          
          const location = await populateLocation(Location.findById(locationId))
      
          if (!location) throw new Error('Location not found')
      
          return JSON.parse(JSON.stringify(location))
        } catch (error) {
          handleError(error)
        }
      }
export async function getAllLocations({ query, limit = 6, page }: getAllLocationsParams) {
        try {
          await connectToDatabase()
      
          const skipAmount = (Number(page) - 1) * limit
          const locationsQuery = Location.find() 
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(limit)
      
          const locations = await populateLocation(locationsQuery).exec();
          const locationsCount = await Location.countDocuments()
      
          return {
            data: JSON.parse(JSON.stringify(locations)),
            totalPages: Math.ceil(locationsCount / limit)
          }
        } catch (error) {
          handleError(error)
        }
      }
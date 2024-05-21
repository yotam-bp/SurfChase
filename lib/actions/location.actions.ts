import { getAllLocationsParams } from "@/types";
import { connectToDatabase } from "../database";
import Season from "../database/models/season.model";
import Spot from "../database/models/spot.model";
import { handleError } from "../utils";
import Location from "../database/models/locations.model";

const populateLocation = (query: any) => {
        return query
          .populate({ path: 'season', model: Season, select: ' ' })
          .populate({ path: 'spots', model: Spot, select: '' })
      }
export async function getAllLocations({ query, limit = 6, page }: getAllLocationsParams) {
        try {
          await connectToDatabase()
      
          const skipAmount = (Number(page) - 1) * limit
          const locationsQuery = Location.find()
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(limit)
      
          const locations = await populateLocation(locationsQuery)
        //   const locationsCount = await Event.countDocuments()
      
          return {
            data: JSON.parse(JSON.stringify(locations)),
        //     totalPages: Math.ceil(locationsCount / limit),
          }
        } catch (error) {
          handleError(error)
        }
      }
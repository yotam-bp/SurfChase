import { getAllLocationsParams } from "@/types";
import { connectToDatabase } from "../database";
import Season from "../database/models/season.model";
import Spot from "../database/models/spot.model";
import { getTemperatureRange, handleError } from "../utils";
import Location from "../database/models/locations.model";
import MonthlyTemperature from "../database/models/monthlyTemperature.model";

const populateLocation = (query: any) => {
  return query
    .populate({
      path: "seasons",
      model: Season,
      select: "_id type crowd surfingLevel months ",
    })
    .populate({ path: "spots", model: Spot, select: "_id name" })
    .populate({
      path: "monthlyTemperatures",
      model: MonthlyTemperature,
      select: "_id entries",
    });
};

export async function getLocationIdById(locationId: string) {
  try {
    await connectToDatabase();

    const location = await populateLocation(Location.findById(locationId));

    if (!location) throw new Error("Location not found");

    return JSON.parse(JSON.stringify(location));
  } catch (error) {
    handleError(error);
  }
}

export async function getAllLocations({ query }: getAllLocationsParams) {
  try {
    await connectToDatabase();
    const { surfingLevel, budget, waterTemp, monthToTravel, page, limit } = query;

    // Budget condition
    const budgetConditions = budget ? { budget } : {};

    // Surfing level condition
    let seasonConditions = {};
    if (surfingLevel) {
      const seasonIds = await Season.distinct('_id', { surfingLevel });
      seasonConditions = { seasons: { $in: seasonIds } };
    }

    // Monthly temperature condition
    let temperatureConditions = {};
    if (waterTemp && monthToTravel) {
      const range = getTemperatureRange(waterTemp);
      if (range) {
        const { min, max } = range;
        const monthlyTemperatureIds = await MonthlyTemperature.find({
          'entries': {
            $elemMatch: {
              month: monthToTravel,
              seaTemperature: { $gte: min, $lte: max }
            }
          }
        }).distinct('_id');
        temperatureConditions = { monthlyTemperatures: { $in: monthlyTemperatureIds } };
      }
    }

    // Combine all conditions
    const conditions = {
      $and: [
        budgetConditions,
        seasonConditions,
        temperatureConditions
      ].filter(condition => Object.keys(condition).length > 0) // Filter out empty conditions
    };

    const skipAmount = (Number(page) - 1) * limit;
    const locationsQuery = Location.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit);

    const locations = await populateLocation(locationsQuery).exec();
    const locationsCount = await Location.countDocuments(conditions);
    
    return {
      data: JSON.parse(JSON.stringify(locations)),
      totalPages: Math.ceil(locationsCount / limit)
    };
  } catch (error) {
    handleError(error);
  }
}
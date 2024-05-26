import Spot from "@/lib/database/models/spot.model";
import MonthlyTemperature from "@/lib/database/models/monthlyTemperature.model";
import Location from "@/lib/database/models/locations.model";
import Season from "@/lib/database/models/season.model";
import mongoose from 'mongoose';

const createLocation = async () => {
  // Create spot documents
  const spot1 = new Spot({ name: "Kabalana Rock" });
  const spot2 = new Spot({ name: "Ahangama" });
  const spot3 = new Spot({ name: "Wiligama" });
  const spot4 = new Spot({ name: "Sion" });
  const spot5 = new Spot({ name: "Marshmelows" });
  await spot1.save();
  await spot2.save();
  await spot3.save();
  await spot4.save();
  await spot5.save();

  // Create season document
  const season1 = new Season({
    type: "High",
    crowd: "Medium",
    surfingLevel: ["Beginner", "Intermediate", "Advanced"],
    months: ["May", "June", "July", "August", "September", "October"],
  });

  const season2 = new Season({
    type: "Low",
    crowd: "Medium",
    surfingLevel: ["Beginner", "Intermediate", "Advanced"],
    months: ["November", "December", "January", "February", "March", "April"],
  });

  await season1.save();
  await season2.save();

  // Monthly temperatures data
  const monthlyTemperaturesData = [
    { month: "January", seaTemperature: 28, outsideTemperature: 28.5 },
    { month: "February", seaTemperature: 28.2, outsideTemperature: 29 },
    { month: "March", seaTemperature: 28.5, outsideTemperature: 29 },
    { month: "April", seaTemperature: 28.8, outsideTemperature: 29.3 },
    { month: "May", seaTemperature: 29, outsideTemperature: 30.8 },
    { month: "June", seaTemperature: 29.2, outsideTemperature: 32 },
    { month: "July", seaTemperature: 29.5, outsideTemperature: 32.2 },
    { month: "August", seaTemperature: 29.8, outsideTemperature: 32.5 },
    { month: "September", seaTemperature: 30, outsideTemperature: 32.8 },
    { month: "October", seaTemperature: 30.2, outsideTemperature: 33 },
    { month: "November", seaTemperature: 30.5, outsideTemperature: 32.8 },
    { month: "December", seaTemperature: 30.8, outsideTemperature: 32.5 },
  ];

  // Create a MonthlyTemperature document
  const entries = monthlyTemperaturesData.map((data) => ({
    month: data.month,
    seaTemperature: data.seaTemperature,
    outsideTemperature: data.outsideTemperature,
  }));

  // Logging the entries array
  console.log("Entries:", entries);

  // Create a MonthlyTemperature document
  const monthlyTemperatureDoc = new MonthlyTemperature({
    entries,
  });

  // Logging the document before saving
  console.log("MonthlyTemperature Document:", monthlyTemperatureDoc);

  await monthlyTemperatureDoc.save();

  // Create location document
  const location = new Location({
    name: "South West Sri Lanka",
    country: "Sri Lanka",
    region: "South Asia",
    spots: [spot1._id, spot2._id, spot3._id, spot4._id, spot5._id],
    budget: "Low",
    seasons: [season1._id,season2._id],
    monthlyTemperatures: monthlyTemperatureDoc._id,
    imageUrl:"https://utfs.io/f/a237ac48-8000-41d1-94a9-6461aab6362e-mpuujg.webp"
  });

  await location.save();
  console.log("Location created");
};
const run = async () => {
  await createLocation();
};
// export default run

// run().catch((err) => console.error(err));


async function deleteAllDataExceptUsers() {
  const db = mongoose.connection.db;

  try {
    // Get all collections in the database
    const collections = await db.listCollections().toArray();

    // Iterate over collections and drop each one except for 'users'
    for (const collection of collections) {
      if (collection.name !== 'users') {
        await db.dropCollection(collection.name);
        console.log(`Dropped collection: ${collection.name}`);
      }
    }

    console.log('All collections except users have been dropped.');
  } catch (error) {
    console.error('Error dropping collections:', error);
  }
}

export default deleteAllDataExceptUsers;

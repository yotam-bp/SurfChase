
import Spot from '@/lib/database/models/spot.model';
import MonthlyTemperature from '@/lib/database/models/monthlyTemperature.model';
import Location from '@/lib/database/models/locations.model';
import Season from '@/lib/database/models/season.model';

const createLocation = async () => {
        // Create spot documents
        const spot1 = new Spot({ name: 'Main Point' });
        const spot2 = new Spot({ name: 'Whiskey Point' });
        const spot3 = new Spot({ name: 'Pottuvil Point' });
        await spot1.save();
        await spot2.save();
        await spot3.save();
      
        // Create season document
        const season = new Season({
          type: 'High',
          crowd: 'Medium',
          surfingLevel: ['Beginner', 'Intermediate', 'Advanced']
        });
      
        await season.save();
      
        // Monthly temperatures data
        const monthlyTemperaturesData = [
          { month: 'January', seaTemperature: 28, outsideTemperature: 30.5 },
          { month: 'February', seaTemperature: 28.2, outsideTemperature: 30.8 },
          { month: 'March', seaTemperature: 28.5, outsideTemperature: 31.2 },
          { month: 'April', seaTemperature: 28.8, outsideTemperature: 31.5 },
          { month: 'May', seaTemperature: 29, outsideTemperature: 31.8 },
          { month: 'June', seaTemperature: 29.2, outsideTemperature: 32 },
          { month: 'July', seaTemperature: 29.5, outsideTemperature: 32.2 },
          { month: 'August', seaTemperature: 29.8, outsideTemperature: 32.5 },
          { month: 'September', seaTemperature: 30, outsideTemperature: 32.8 },
          { month: 'October', seaTemperature: 30.2, outsideTemperature: 33 },
          { month: 'November', seaTemperature: 30.5, outsideTemperature: 33.2 },
          { month: 'December', seaTemperature: 30.8, outsideTemperature: 33.5 }
        ];
      
        // Create a MonthlyTemperature document
        const entries = monthlyTemperaturesData.map(data => ({
          month: data.month,
          seaTemperature: data.seaTemperature,
          outsideTemperature: data.outsideTemperature
        }));
        
        // Logging the entries array
        console.log('Entries:', entries);
      
        // Create a MonthlyTemperature document
        const monthlyTemperatureDoc = new MonthlyTemperature({
          entries
        });
      
        // Logging the document before saving
        console.log('MonthlyTemperature Document:', monthlyTemperatureDoc);
        
        await monthlyTemperatureDoc.save();
      
        // Create location document
        const location = new Location({
          name: 'South East Sri Lanka',
          country: 'Sri Lanka',
          region: 'South Asia',
          spots: [spot1._id, spot2._id, spot3._id],
          budget: 'Low',
          season: season._id,
          monthlyTemperatures: monthlyTemperatureDoc._id
        });
      
      
        await location.save();
        console.log('Location created');
      
      };const run = async () => {
        
        await createLocation();
        
      };
      
      run().catch(err => console.error(err));
      
      
import Collection from "@/components/shared/Collection";
import run from "@/lib/actions/createLocation.actions";
import { getEventById } from "@/lib/actions/event.actions";
import { getLocationIdById } from "@/lib/actions/location.actions";
import { ILocation } from "@/lib/database/models/locations.model";
import { formatDateTime, getCurrentMonth } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";

const LocationDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const location: ILocation = await getLocationIdById(id);
  const firstMonth = location.seasons[1].months[0];
  const lastMonthIndex = location.seasons[1].months.length - 1;
  const lastMonth = location.seasons[1].months[lastMonthIndex];
  const currentMonth: string = getCurrentMonth();

  const getTemperatures = () => {
    const monthData = location.monthlyTemperatures.entries?.find(
      (item) => item.month === currentMonth
    );
    return {
      seaTemp: monthData?.seaTemperature,
      outsideTemp: monthData?.outsideTemperature,
    };
  };

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <div className="relative h-[300px] w-full md:h-auto">
            <Image
              src={location.imageUrl}
              alt="hero image"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="rounded-t-xl md:rounded-none md:rounded-l-xl"
              loading="lazy"
            />
          </div>

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{location.name}</h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex flex-wrap gap-3">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                    {location.country}
                  </p>
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {location.region}
                  </p>
                  <p className="p-medium-16 rounded-full bg-red-500/10 px-4 py-2.5 text-grey-500">
                    {location.budget}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <Image
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={32}
                  height={32}
                />
                best on : {firstMonth} - {lastMonth}
              </div>

              <div className="p-regular-20 flex items-center gap-3">
                <Image
                  src="/assets/icons/location.svg"
                  alt="location"
                  width={32}
                  height={32}
                />
                <p className="p-medium-16 lg:p-regular-20">{location.region}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">
                weather on {currentMonth}:
              </p>
              <p className="p-medium-16 lg:p-regular-18">
                🌡️ Outside Temperatures {getTemperatures().outsideTemp}
              </p>
              <p className="p-medium-16 lg:p-regular-18">
                🌊 Sea Temperatures {getTemperatures().seaTemp}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS with the same category */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        {/* <h2 className="h2-bold">Related Events</h2> */}

        {/* <Collection
          data={relatedEvents?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          // collectionType="All_Events"
          limit={3}
          page={searchParams.page as string}
          // totalPages={relatedEvents?.totalPages}
        /> */}
      </section>
    </>
  );
};

export default LocationDetails;

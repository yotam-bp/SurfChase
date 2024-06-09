import Collection from "@/components/shared/Collection";
import EventForm from "@/components/shared/EventForm";
import { getLatestEventByUser } from "@/lib/actions/event.actions";
import { getAllLocations } from "@/lib/actions/location.actions";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import React from "react";

const ExplorePage = async ({ searchParams }:SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;
  
  //   const orders = await getOrdersByUser({ userId, page: ordersPage})
  
  const surfingLevel = searchParams?.surfingLevel as string || "";
  const budget = searchParams?.budget as string || "";
  const waterTemp = searchParams?.waterTemp as string || "";
  const monthToTravel = searchParams?.monthToTravel as string || "";
  
  const query = {
    surfingLevel: surfingLevel,
    budget:budget,
    waterTemp: waterTemp,
    monthToTravel:monthToTravel,
    page: eventsPage | ordersPage,
    limit: 6,
  };
  const locations = await getAllLocations({query});
  const lastEventCreated = await getLatestEventByUser(userId);
  
  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">
            Best Destinations For you
          </h3>
        </div>
        <EventForm userId={userId} type="Update"  event={lastEventCreated} eventId={lastEventCreated._id} />
      </section>

      <section className="wrapper my-8">
        <Collection
          data={locations?.data}
          emptyTitle="No destinations found"
          emptyStateSubtext="No worries - you can search again"
          collectionType="My_Destinations"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={locations?.totalPages}
          userId={userId}
        />
      </section>
    </>
  );
};

export default ExplorePage;

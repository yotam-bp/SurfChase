import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import {
  getAllEventsByUser,
  getEventsByUser,
} from "@/lib/actions/event.actions";
import { getAllLocations } from "@/lib/actions/location.actions";
// import { getOrdersByUser } from '@/lib/actions/order.actions'
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  //   const orders = await getOrdersByUser({ userId, page: ordersPage})
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";
  const events = await getAllEventsByUser({
    userId,
    query: searchText,
    category,
    page,
    limit: 6,
  });

  const locations = await getAllLocations({
    query: searchText,
    page,
    limit: 6,
  });

  // console.log(locations);
  

  //   const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  const organizedEvents = await getEventsByUser({ userId, page: eventsPage });

  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Destinations</h3>
          {/* <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">Explore More Events</Link>
          </Button> */}
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={events?.data}
          emptyTitle="No destinations have been added yet"
          emptyStateSubtext="No worries - you can always add more later"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={events?.totalPages}
        />
      </section>

      {/* Events Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Last Search</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create"></Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={organizedEvents?.data}
          emptyTitle="Nothing Is Here Yet"
          emptyStateSubtext="Search your dream vacation now"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.totalPages}
        />
      </section>
    </>
  );
};

export default ProfilePage;

import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import {
  getAllEventsByUser,
} from "@/lib/actions/event.actions";
import { getAllFavorites } from "@/lib/actions/favorites.actions";
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
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  // const category = (searchParams?.category as string) || "";
  //   const orders = await getOrdersByUser({ userId, page: ordersPage})

  const events = await getAllEventsByUser({
    userId,
    query: searchText,
    // category,
    page,
    limit: 6,
  });
  
  const favorites = await getAllFavorites(userId);
  //   const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  // const organizedEvents = await getEventsByUser({ userId, page: eventsPage });

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
          data={favorites} 
          emptyTitle="No destinations have been added yet"
          emptyStateSubtext="No worries - you can always add more later"
          collectionType="My_Destinations"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          // totalPages={favorites?.totalPages}
          userId={userId}
        />
      </section> 

      {/* Events Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Last Search</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create">New Search</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={events?.data}
          emptyTitle="Nothing Is Here Yet"
          emptyStateSubtext="Search your dream vacation now"
          collectionType="Last_Search"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          // totalPages={organizedEvents?.totalPages}
          userId={userId}
        />
      </section>
    </>
  );
};

export default ProfilePage;

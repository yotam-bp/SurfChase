// import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import EventForm from "@/components/shared/EventForm";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getAllEventsByUser } from "@/lib/actions/event.actions";
import { getHottestLocations } from "@/lib/actions/location.actions";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  // const category = (searchParams?.category as string) || "";

  const hottestLocations = await getHottestLocations(6);

  let events = null;
  if (userId) {
    events = await getAllEventsByUser({
      query: searchText,
      userId,
      // category,
      page,
      limit: 6,
    });
  }

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Find your next surf trip by your terms, easily!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Answer the questions, specify the smallest details, discover the
              right vacation for you.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#search">Explore Now</Link>
            </Button>
          </div>

          <Image
            src="/assets/images/hero.jpg"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>
      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">Hottest Locations This Month</h2>
        {/* 
          <div className="flex w-full flex-col gap-5 md:flex-row">
            <Search />
            <CategoryFilter />
          </div> */}

        <Collection
          data={hottestLocations?.data}
          emptyTitle="Nothing Is Here Yet"
          emptyStateSubtext="Search your dream vacation now"
          collectionType="My_Destinations"
          limit={6}
          page={page}
          // totalPages={events?.totalPages}
          userId={userId}
        />
      </section>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10" id="search">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Search vacation
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm userId={userId} type="Create" />
      </div>
      {events && (
        <section
          id="events"
          className="wrapper my-8 flex flex-col gap-8 md:gap-12"
        >
          <h2 className="h2-bold">Last Search</h2>

          <div className="flex w-full flex-col gap-5 md:flex-row">
            {/* <Search /> */}
            {/* <CategoryFilter /> */}
          </div>

          <Collection
            data={events?.data}
            emptyTitle="Nothing Is Here Yet"
            emptyStateSubtext="Search your dream vacation now"
            collectionType="Last_Search"
            limit={6}
            page={page}
            // totalPages={events?.totalPages}
            userId={userId}
          />
        </section>
      )}
    </>
  );
}

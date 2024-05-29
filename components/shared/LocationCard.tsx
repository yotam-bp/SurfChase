import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { ILocation } from "@/lib/database/models/locations.model";

type CardProps = {
  location: ILocation;
};

const Card = ({ location }: CardProps) => {
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/events/${location._id}`}
        style={{ backgroundImage: `url(${location.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />
      <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
        <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
          {location.name}
        </p>
      </div>

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        <div className="flex gap-2">
          <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
            {/* {location.season?.type} */}
          </span>
          <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
            {/* {location.season?.crowd} */}
          </p>
        </div>

        <p className="p-medium-16 p-medium-18 text-grey-500">
          {location.country}
        </p>
        {/* <Link href={`/events/${location._id}`}> */}
        <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
          {location.region}
        </p>
        {/* </Link> */}

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {location.region}
          </p>

          {/* <Link
            href={`/orders?eventId=${location.season}`}
            className="flex gap-2"
          > */}
          <p className="text-primary-500">See Spots</p>
          <Image
            src="/assets/icons/arrow.svg"
            alt="search"
            width={10}
            height={10}
          />
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Card;

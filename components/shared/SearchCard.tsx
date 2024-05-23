import { IEvent } from "@/lib/database/models/event.model";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";

type CardProps = {
  event: IEvent;
};

const SearchCard = ({ event }: CardProps) => {
  const eventDetails = [
    { label: "Surfing Level", value: event.surfingLevel },
    { label: "Budget", value: event.budget },
    { label: "Water Temperature", value: event.waterTemp },
  ];

  return (
    <div className="group relative flex min-h-[180px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/events/${event._id}`}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />
      <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-gray-50 p-3 shadow-sm transition-all">
        <Link href={`/events/${event._id}/update`}>
          <Image
            src="/assets/icons/edit.svg"
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
        <DeleteConfirmation eventId={event._id} />
      </div>
      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        <h3 className="text-xl font-semibold">{event.title}</h3>
        <p className="text-gray-500">{event.category.name}</p>
        <div className="flex flex-col gap-2 mt-3">
          {eventDetails.map((detail, index) => (
            <div key={index} className="flex justify-between">
              <span className="font-medium">{detail.label}</span>
              <span className="text-gray-700">{detail.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchCard;

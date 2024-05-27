import { IEvent } from "@/lib/database/models/event.model";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { BUDGET_LABEL, MONTH_LABEL, SURFING_LEVEL_LABEL, WATER_TEMP_LABEL } from "@/constants";

type CardProps = {
  event: IEvent;
};

const SearchCard = ({ event }: CardProps) => {
  const eventDetails = [
    { label: SURFING_LEVEL_LABEL, value: event.surfingLevel },
    { label: BUDGET_LABEL, value: event.budget },
    { label: WATER_TEMP_LABEL, value: event.waterTemp },
    { label: MONTH_LABEL, value: event.monthToTravel },
  ];

  return (
    <div className="group relative flex min-h-[180px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">

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
        <div className="flex flex-col gap-1 mt-3">
          {eventDetails.map((detail, index) => (
            <div key={index} className="flex justify-between text-sm">
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

import { IEvent } from '@/lib/database/models/event.model';
import React from 'react';
import LocationCard from './LocationCard';
import Pagination from './Pagination';
import { ILocation } from '@/lib/database/models/locations.model';
import { IFavorite } from '@/lib/database/models/favorites.model'; // Assuming this is correctly imported
import SearchCard from './SearchCard';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type CollectionProps = {
  data: ILocation[] | IEvent[] | IFavorite[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: 'Last_Search' | 'My_Destinations';
  userId: string;
};

const isEvent = (item: ILocation | IEvent | IFavorite): item is IEvent => {
  return (item as IEvent).organizer !== undefined;
};

const isLocation = (item: ILocation | IEvent | IFavorite): item is ILocation => {
  return (item as ILocation).name !== undefined;
};

const isFavorite = (item: ILocation | IEvent | IFavorite): item is IFavorite => {
  return (item as IFavorite).location !== undefined && (item as IFavorite).user !== undefined;
};

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
  userId,
}: CollectionProps) => {
  const useCarousel = data.length > 3;

  return (
    <>
      {data && data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          {useCarousel ? (
            <Carousel className="w-full max-w-5xl">
              <CarouselContent className="-ml-1">
                {data.map((item, index) => {
                  // Check if the item is a favorite and extract the location if it is
                  const location = isFavorite(item) ? item.location : isLocation(item) ? item : null;

                  return (
                    <CarouselItem key={isFavorite(item) ? item.location._id : item._id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                      <div className="p-2 flex justify-center">
                        {isEvent(item) && collectionType === 'Last_Search' && (
                          <SearchCard event={item} />
                        )}
                        {location && collectionType === 'My_Destinations' && (
                          <LocationCard location={location} userId={userId} />
                        )}
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              {/* find a way to remove arrows on phone */}
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          ) : (
            <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
              {data.map((item) => {
                // Check if the item is a favorite and extract the location if it is
                const location = isFavorite(item) ? item.location : isLocation(item) ? item : null;

                return (
                  <li key={isFavorite(item) ? item.location._id : item._id} className="flex justify-center">
                    {isEvent(item) && collectionType === 'Last_Search' && (
                      <SearchCard event={item} />
                    )}
                    {location && collectionType === 'My_Destinations' && (
                      <LocationCard location={location} userId={userId} />
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          {totalPages > 1 && (
            <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
          )}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection;

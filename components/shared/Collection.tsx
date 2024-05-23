import { IEvent } from '@/lib/database/models/event.model';
import React from 'react';
import LocationCard from './LocationCard';
import Pagination from './Pagination';
import { ILocation } from '@/lib/database/models/locations.model';
import SearchCard from './SearchCard';

type CollectionProps = {
  data: ILocation[] | IEvent[],
  emptyTitle: string,
  emptyStateSubtext: string,
  limit: number,
  page: number | string,
  // totalPages?: number,
  urlParamName?: string,
  collectionType?: 'Last_Search' | 'My_Destinations'
}

const isEvent = (item: ILocation | IEvent): item is IEvent => {
  return (item as IEvent).title !== undefined;
}

const isLocation = (item: ILocation | IEvent): item is ILocation => {
  return (item as ILocation).name !== undefined;
}

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  // totalPages = 0,
  collectionType,
  urlParamName,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((dataArray) => (
              <li key={dataArray._id} className="flex justify-center">
                {isEvent(dataArray) && collectionType === 'Last_Search' && (
                  <SearchCard event={dataArray} />
                )}
                {isLocation(dataArray) && collectionType === 'My_Destinations' && (
                  <LocationCard location={dataArray} />
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )} 
    </>
  );
}

export default Collection;

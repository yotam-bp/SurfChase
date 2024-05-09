// import { IEvent } from '@/lib/database/models/event.model'
// import React from 'react'
// import Card from './Card'
// import Pagination from './Pagination'

// type CollectionProps = {
//   data: IEvent[],
//   emptyTitle: string,
//   emptyStateSubtext: string,
//   limit: number,
//   page: number | string,
//   totalPages?: number,
//   urlParamName?: string,
//   collectionType?: 'Events_Organized' | 'My_Tickets' | 'All_Events'
// }

<<<<<<< HEAD
// const Collection = ({
//   data,
//   emptyTitle,
//   emptyStateSubtext,
//   page,
//   totalPages = 0,
//   collectionType,
//   urlParamName,
// }: CollectionProps) => {
//   return (
//     <>
//       {data.length > 0 ? (
//         <div className="flex flex-col items-center gap-10">
//           <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
//             {data.map((event) => {
//               const hasOrderLink = collectionType === 'Events_Organized';
//               const hidePrice = collectionType === 'My_Tickets';
=======
const Collection = ({
  // data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: CollectionProps) => {
  return (
    <>
      {/* {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((event) => {
              const hasOrderLink = collectionType === 'Events_Organized';
              const hidePrice = collectionType === 'My_Tickets';
>>>>>>> 7cf714582cb99efc30d01bd70a71e8ff750da1e7

//               return (
//                 <li key={event._id} className="flex justify-center">
//                   <Card event={event} hasOrderLink={hasOrderLink} hidePrice={hidePrice} />
//                 </li>
//               )
//             })}
//           </ul>

<<<<<<< HEAD
//           {totalPages > 1 && (
//             <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
//           )}
//         </div>
//       ): (
//         <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
//           <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
//           <p className="p-regular-14">{emptyStateSubtext}</p>
//         </div>
//       )} 
//     </>
//   )
// }
=======
          {totalPages > 1 && (
            <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
          )}
        </div>
      ): (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}  */}
    </>
  )
}
>>>>>>> 7cf714582cb99efc30d01bd70a71e8ff750da1e7

// export default Collection
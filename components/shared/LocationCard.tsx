"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ILocation } from "@/lib/database/models/locations.model";
import { addToFavorites, deleteFromFavorites, getAllFavorites } from "@/lib/actions/favorites.actions";

type CardProps = {
  location: ILocation;
  userId: string;
};

const LocationCard = ({ location, userId }: CardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (userId) {
        const favorites = await getAllFavorites(userId);
        const isFav = favorites.some((fav: any) => fav.location._id === location._id);
        setIsFavorite(isFav);
      }
    };
    checkFavorite();
  }, [userId, location._id]);

  const handleFavoriteToggle = async () => {
    if (!userId) return;

    try {
      if (isFavorite) {
        await deleteFromFavorites(userId, location._id, "/favorites");
      } else {
        await addToFavorites(userId, location._id, "/favorites");
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link href={`/locations/${location._id}`} className="flex flex-col flex-grow">
        <div
          style={{ backgroundImage: `url(${location.imageUrl})` }}
          className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
        />
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
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
            {location.name}
          </p>

          <div className="flex-between w-full">
            <p className="p-medium-14 md:p-medium-16 text-grey-600">
              {location.region}
            </p>

            <div className="flex gap-2">
              <p className="text-primary-500">See Spots</p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="search"
                width={10}
                height={10}
              />
            </div>
          </div>
        </div>
      </Link>
      <button
        onClick={handleFavoriteToggle}
        className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-2 shadow-sm transition-all"
      >
        <Image
          src={isFavorite ? "/assets/icons/heart-filled.svg" : "/assets/icons/heart.svg"}
          alt="Favorite"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default LocationCard;

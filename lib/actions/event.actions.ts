"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import Event from "@/lib/database/models/event.model";
import User from "@/lib/database/models/user.model";
import Category from "@/lib/database/models/category.model";
import { handleError } from "@/lib/utils";

import {
  CreateEventParams,
  UpdateEventParams,
  DeleteEventParams,
  GetAllEventsParams,
  GetEventsByUserParams,
  GetRelatedEventsByCategoryParams,
} from "@/types";

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: "i" } });
};

const populateEvent = (query: any) => {
  return query.populate({
    path: "organizer",
    model: User,
    select: "_id firstName lastName",
  });
  // .populate({ path: "category", model: Category, select: "_id name" });
};

// CREATE
export async function createEvent({ userId, event, path }: CreateEventParams) {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);

    if (!organizer) throw new Error("Organizer not found");

    const eventData = {
      ...event,
      createdAt: new Date(),
      updatedAt: new Date(),
      organizer: userId,
    };

    const newEvent = await Event.create(eventData);
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
}

// GET ONE EVENT BY ID
export async function getEventById(eventId: string) {
  try {
    await connectToDatabase();

    const event = await populateEvent(Event.findById(eventId));

    if (!event) throw new Error("Event not found");

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateEvent({ userId, event, path }: UpdateEventParams) {
  try {
    await connectToDatabase();

    const eventToUpdate = await Event.findById(event._id);
    if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
      throw new Error("Unauthorized or event not found");
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event , updatedAt: new Date()},
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedEvent));
  } catch (error) {
    handleError(error);
  }
}
export async function getLatestEventByUser(userId: string) {
  try {
    await connectToDatabase();

    const latestEvent = await Event.findOne({ organizer:userId }).sort({ updatedAt: -1 }).exec();

    if (!latestEvent) throw new Error("No events found for this user");

    return JSON.parse(JSON.stringify(latestEvent));
  } catch (error) {
    console.error(`Error occurred: ${error}`);
    handleError(error);
  }
}

// DELETE
export async function deleteEvent({ eventId, path }: DeleteEventParams) {
  try {
    await connectToDatabase();

    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (deletedEvent) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// GET ALL EVENTS
export async function getAllEventsByUser({
  query,
  limit = 6,
  page,
  // category,
  userId,
}: GetAllEventsParams) {
  try {
    await connectToDatabase();

    if (!userId) throw new Error("Unauthorized");

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    // const categoryCondition = category
    //   ? await getCategoryByName(category)
    //   : null;
    const userCondition = userId ? { organizer: userId } : {};
    const conditions = {
      $and: [
        titleCondition,
        userCondition,
        // categoryCondition ? { category: categoryCondition._id } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const eventsQuery = Event.find(conditions).sort({ updatedAt: "desc" });
    // .skip(skipAmount)
    // .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}


import * as z from "zod";

const message: string = "Choose at least one option";

export const eventFormSchema = z.object({
  // title: z.string().min(3, 'Title must be at least 3 characters'),
  // description: z.string().min(3, 'Description must be at least 3 characters').max(400, 'Description must be less than 400 characters'),
  // location: z.string().min(3, 'Location must be at least 3 characters').max(400, 'Location must be less than 400 characters'),
  // imageUrl: z.string(),
  // startDateTime: z.date(),
  // endDateTime: z.date(),
  // categoryId: z.string(),
  surfingLevel: z
    .string()
    .refine(
      (value) => ["Beginner", "Intermediate", "Advanced"].includes(value),
      {
        message,
      }
    ),
  budget: z.string().refine((value) => ["Low", "Mid", "High"].includes(value), {
    message,
  }),
  waterTemp: z
    .string()
    .refine((value) => ["Cold", "Mid", "Warm"].includes(value), {
      message,
    }),
  monthToTravel: z
    .string()
    .refine(
      (value) =>
        [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ].includes(value),
      {
        message,
      }
    ),
  // price: z.string(),
  // isFree: z.boolean(),
  // url: z.string().url()
});

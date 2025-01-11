import { z } from "zod";

export const TravelTypeSchema = z.enum(["solo", "couple"]);

export const SearchItinerarySchema = z.object({
  location: z.string({ required_error: "Location must not be empty" }).min(1, {message:"Please enter a Location"}),
  travelType: TravelTypeSchema,

  budget: z
    .string()
    .transform((val) => parseFloat(val))
    .superRefine((num, ctx) => {
        if (isNaN(num)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please enter a Budget",
          });
          return; // If this fails, skip further checks
        }
        if (num < 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Number must be at least 0",
          });
        }
      })
    // .refine((num) => !isNaN(num), {
    //   message: "Please enter a Budget",
    // })
    // .refine((num) => num >= 0, {
    //   message: "Budget must be at least 0",
    // }),
});

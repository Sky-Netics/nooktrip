"use server";

import { SearchItinerarySchema } from "@/schema/utils.schema";

type SearchFormProps = {
  result?: object;
  zodErrors?: object;
  errorMessage?: string;
};

export async function validateSearchItinerary(
  prevState: { zodErrors?: object },
  formData: FormData
) {
    
  const location = formData.get("location");
  const travelType = formData.get("travelType");
  const budget = formData.get("budget")

  const validationFields = SearchItinerarySchema.safeParse({
    location,
    travelType,
    budget,
  });

  if (!validationFields.success) {
    return {
      ...prevState,
      zodErrors: validationFields.error.flatten().fieldErrors,
    };
  }

  return {zodErrors: {}};
}

export async function searchItinerary(
  prevState: SearchFormProps,
  formData: FormData
): Promise<SearchFormProps> {
  const requestUrl =
    "https://46ogydfki6koiatfd7s5giqope0fvzrs.lambda-url.us-east-2.on.aws/";
  try {
    const location = formData.get("location");
    const travelType = formData.get("location");
    const budget = formData.get("budget");

    const validationFields = SearchItinerarySchema.safeParse({
      location,
      travelType,
      budget,
    });

    if (!validationFields.success) {
      return {
        ...prevState,
        result: {},
        zodErrors: validationFields.error.flatten().fieldErrors,
      };
    }

    const requestOptions = { method: "POST", body: formData };
    const response = await fetch(requestUrl, requestOptions);

    const data = await response.json();

    if (response.status != 200) {
      return {
        result: {},
        zodErrors: undefined,
        errorMessage: data?.detail,
      };
    }

    return {
      result: data,
      zodErrors: undefined,
      errorMessage: undefined,
    };
  } catch (error) {
    console.log("error:", error);

    return {
      result: {},
      zodErrors: undefined,
      errorMessage: "Somthing went wrong!",
    };
  }
}

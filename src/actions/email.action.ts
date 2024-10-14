"use server";

import { z } from "zod";

type SendMailProps = {
  success: boolean;
  zodErrors?: {
    email?: string[] | undefined;
  };
  errorMessage?: string;
};

const SendEmailSchema = z.object({
  email: z
    .string({ required_error: "Email must not be empty" })
    .email({ message: "Invalid email address" }),
});

export async function sendMail(
  prevState: SendMailProps,
  formData: FormData
): Promise<SendMailProps> {
  const requestUrl =
    "https://aczo43c13c.execute-api.us-east-2.amazonaws.com/dev/emails";
  try {
    const email = formData.get("email");
    const itinerary = JSON.parse(formData.get("itinerary") as string);

    const validationFields = SendEmailSchema.safeParse({ email });

    if (!validationFields.success) {
      return {
        ...prevState,
        success: false,
        zodErrors: validationFields.error.flatten().fieldErrors,
      };
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        itinerary: itinerary,
      }),
      next: { revalidate: 0 },
    };

    const response = await fetch(requestUrl, requestOptions);
    const data = await response.json();    
    
    if (response.status != 200) {
      return {
        success: false,
        zodErrors: {},
        errorMessage: data?.message,
      };
    }

    return { success: true, zodErrors: {}, errorMessage: "" };
  } catch (error) {
    console.log("error:", error);

    return {
      success: false,
      zodErrors: {},
      errorMessage: "Somthing went wrong!",
    };
  }
}

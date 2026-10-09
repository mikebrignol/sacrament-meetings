"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  addMeeting,
  updateMeeting as updateMeetingInDb,
  deleteMeeting as deleteMeetingFromDb,
} from "./meetings-db";

export type State = {
  message?: string;
  errors?: {
    [key: string]: string[];
  };
};

const MeetingFormSchema = z.object({
  date: z.string().min(1, "Date is required."),
  meetingType: z.enum(["testimony", "regular", "stake", "general"], {
    message: "Please select a valid meeting type.",
  }),
  presiding: z.string().min(1, "Presiding is required."),
  conducting: z.string().min(1, "Conducting is required."),
  announcements: z.string().optional(),
  openingHymnNumber: z.coerce
    .number()
    .int()
    .positive("Opening hymn number must be positive."),
  openingHymnTitle: z.string().min(1, "Opening hymn title is required."),
  openingPrayer: z.string().min(1, "Opening prayer is required."),
  wardBusiness: z.string().optional(),
  stakeBusiness: z.coerce.boolean().default(false),
  sacramentHymnNumber: z.coerce
    .number()
    .int()
    .positive("Sacrament hymn number must be positive."),
  sacramentHymnTitle: z
    .string()
    .min(1, "Sacrament hymn title is required."),
  speakers: z.string().optional(),
  closingHymnNumber: z.coerce
    .number()
    .int()
    .positive("Closing hymn number must be positive."),
  closingHymnTitle: z.string().min(1, "Closing hymn title is required."),
  closingPrayer: z.string().min(1, "Closing prayer is required."),
});

function getFormData(formData: FormData) {
  return {
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    announcements: formData.get("announcements"),
    openingHymnNumber: formData.get("openingHymnNumber"),
    openingHymnTitle: formData.get("openingHymnTitle"),
    openingPrayer: formData.get("openingPrayer"),
    wardBusiness: formData.get("wardBusiness"),
    stakeBusiness: formData.get("stakeBusiness"),
    sacramentHymnNumber: formData.get("sacramentHymnNumber"),
    sacramentHymnTitle: formData.get("sacramentHymnTitle"),
    speakers: formData.get("speakers"),
    closingHymnNumber: formData.get("closingHymnNumber"),
    closingHymnTitle: formData.get("closingHymnTitle"),
    closingPrayer: formData.get("closingPrayer"),
  };
}

function parseLines(value: string | null): string[] {
  if (!value) {
    return [];
  }

  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseSpeakers(value: string | null) {
  return parseLines(value).map((line) => {
    const [name, topic] = line.split("|").map((part) => part.trim());

    return {
      type: "speaker" as const,
      name,
      topic: topic ?? "",
    };
  });
}

function buildMeetingData(data: z.infer<typeof MeetingFormSchema>) {
  return {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    announcements: parseLines(data.announcements ?? null),
    openingHymn: {
      number: data.openingHymnNumber,
      title: data.openingHymnTitle,
    },
    openingPrayer: data.openingPrayer,
    wardBusiness: parseLines(data.wardBusiness ?? null).map((description) => ({
      description,
    })),
    stakeBusiness: data.stakeBusiness,
    sacramentHymn: {
      number: data.sacramentHymnNumber,
      title: data.sacramentHymnTitle,
    },
    speakers: parseSpeakers(data.speakers ?? null),
    closingHymn: {
      number: data.closingHymnNumber,
      title: data.closingHymnTitle,
    },
    closingPrayer: data.closingPrayer,
  };
}

export async function createMeeting(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = MeetingFormSchema.safeParse(getFormData(formData));

  if (!validatedFields.success) {
    return {
      message: "Please correct the errors below.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await addMeeting(buildMeetingData(validatedFields.data));

    revalidatePath("/meetings");
  } catch (error) {
    console.error("Failed to create meeting:", error);

    return {
      message: "Database error: Unable to create the meeting.",
    };
  }

  redirect("/meetings");
}

export async function updateMeeting(
  id: number,
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = MeetingFormSchema.safeParse(getFormData(formData));

  if (!validatedFields.success) {
    return {
      message: "Please correct the errors below.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const meeting = await updateMeetingInDb(
      id,
      buildMeetingData(validatedFields.data)
    );

    if (!meeting) {
      return {
        message: "Meeting not found.",
      };
    }

    revalidatePath("/meetings");
    revalidatePath(`/meetings/${id}`);
  } catch (error) {
    console.error("Failed to update meeting:", error);

    return {
      message: "Database error: Unable to update the meeting.",
    };
  }

  redirect("/meetings");
}

export async function deleteMeeting(id: number): Promise<void> {
  try {
    const deleted = await deleteMeetingFromDb(id);

    if (!deleted) {
      throw new Error("Meeting not found.");
    }

    revalidatePath("/meetings");
    revalidatePath(`/meetings/${id}`);
  } catch (error) {
    console.error("Failed to delete meeting:", error);
    throw new Error("Unable to delete the meeting.");
  }

  redirect("/meetings");
}

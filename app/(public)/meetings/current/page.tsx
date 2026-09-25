import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

export default async function CurrentMeetingPage(): Promise<never> {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  const sundayDate = sunday.toISOString().slice(0, 10);

  const meetings = await getMeetings(sundayDate);
  const meeting = meetings[0];

  redirect(meeting ? `/meetings/${meeting.id}` : "/meetings");
}
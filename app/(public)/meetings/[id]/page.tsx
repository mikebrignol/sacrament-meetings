import MeetingDetail from "@/components/MeetingDetail";
import type { SacramentMeeting } from "@/lib/types";
import Link from "next/link";

interface MeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getMeeting(
  id: string
): Promise<SacramentMeeting> {
  const response = await fetch(
    `http://localhost:3000/api/meetings/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Meeting not found");
  }

  return response.json();
}

export default async function MeetingPage({
  params,
}: MeetingPageProps) {
  const { id } = await params;
  const meeting = await getMeeting(id);

  return (
    <section>
      <div className="mb-6">
        <Link
          href="/meetings"
          className="text-blue-700 hover:underline"
        >
          ← Back to meetings
        </Link>
      </div>

      <MeetingDetail meeting={meeting} />
    </section>
  );
}
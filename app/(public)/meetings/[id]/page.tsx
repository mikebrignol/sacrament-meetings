import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface MeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MeetingPage({
  params,
}: MeetingPageProps) {
  const { id } = await params;

  const meeting = await getMeetingById(Number(id));

  if (!meeting) {
    notFound();
  }

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
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROGRAMS_DATA } from "../../../lib/constants";
import ProgramDetailClient from "./ProgramDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = PROGRAMS_DATA.find((p) => p.slug === slug);
  if (!program) return { title: "Program Tidak Ditemukan | P3RI Salman ITB" };

  return {
    title: `${program.title} | P3RI Salman ITB`,
    description: program.details.description,
  };
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const program = PROGRAMS_DATA.find((p) => p.slug === slug);

  if (!program) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background-page">
      <ProgramDetailClient program={program} />
    </main>
  );
}

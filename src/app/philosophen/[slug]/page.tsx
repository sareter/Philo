import { notFound } from "next/navigation";
import {
  getPhilosophBySlug,
  getAllPhilosophenSlugs,
  getAllPhilosophen,
} from "@/lib/data";
import PhilosophDetailClient from "./PhilosophDetailClient";

export function generateStaticParams() {
  return getAllPhilosophenSlugs().map((slug) => ({ slug }));
}

export default async function PhilosophPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const philosoph = getPhilosophBySlug(slug);
  if (!philosoph) notFound();

  const allePhilosophen = getAllPhilosophen();
  const verwandte = allePhilosophen.filter((p) =>
    philosoph.verwandtePhilosophen.includes(p.slug)
  );

  return (
    <PhilosophDetailClient philosoph={philosoph} verwandte={verwandte} />
  );
}

import { notFound } from "next/navigation";
import {
  getIsmusBySlug,
  getAllIsmenSlugs,
  getAllPhilosophen,
  getAllIsmen,
} from "@/lib/data";
import IsmusDetailClient from "./IsmusDetailClient";

export function generateStaticParams() {
  return getAllIsmenSlugs().map((slug) => ({ slug }));
}

export default async function IsmusPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ismus = getIsmusBySlug(slug);
  if (!ismus) notFound();

  const allePhilosophen = getAllPhilosophen();
  const vertreter = allePhilosophen.filter((p) =>
    ismus.hauptvertreter.includes(p.slug)
  );

  const alleIsmen = getAllIsmen();
  const verwandteIsmen = alleIsmen.filter((i) =>
    ismus.verwandteIsmen.includes(i.slug)
  );

  return (
    <IsmusDetailClient
      ismus={ismus}
      vertreter={vertreter}
      verwandteIsmen={verwandteIsmen}
    />
  );
}

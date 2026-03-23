import { getAllPhilosophen } from "@/lib/data";
import PhilosophenClient from "./PhilosophenClient";

export default function PhilosophenPage() {
  const philosophen = getAllPhilosophen().sort((a, b) =>
    a.name.localeCompare(b.name, "de")
  );

  return <PhilosophenClient philosophen={philosophen} />;
}

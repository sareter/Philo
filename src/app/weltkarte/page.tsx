import { getAllPhilosophen } from "@/lib/data";
import WorldMapClient from "./WorldMapClient";

export default function WeltkartePage() {
  const philosophen = getAllPhilosophen();
  return <WorldMapClient philosophen={philosophen} />;
}

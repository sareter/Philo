import { getAllPhilosophen, getRelations } from "@/lib/data";
import NetworkClient from "./NetworkClient";

export default function NetzwerkPage() {
  const philosophen = getAllPhilosophen();
  const relations = getRelations();
  return <NetworkClient philosophen={philosophen} relations={relations} />;
}

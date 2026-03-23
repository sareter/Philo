import { getAllPhilosophen, getAllIsmen } from "@/lib/data";
import TimelineClient from "./TimelineClient";

export default function ZeitleistePage() {
  const philosophen = getAllPhilosophen();
  const ismen = getAllIsmen();
  return <TimelineClient philosophen={philosophen} ismen={ismen} />;
}

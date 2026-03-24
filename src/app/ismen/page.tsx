import { getAllIsmen } from "@/lib/data";
import { ismenHierarchie } from "@/data/ismen-hierarchie";
import IsmenClient from "./IsmenClient";

export default function IsmenPage() {
  const ismen = getAllIsmen().sort((a, b) =>
    a.name.localeCompare(b.name, "de")
  );

  return <IsmenClient ismen={ismen} hierarchie={ismenHierarchie} />;
}

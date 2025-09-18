import type { Post } from "@/lib/api";

export function selectCityFunction(
  data: Post[],
  selectedCity: string | null
): Post[] {
  if (!selectedCity) return data;
  const wantCity = selectedCity.toLowerCase().trim();
  return data.filter((p) => {
    const userLoc = (p as unknown as { user?: { lokacija?: string } }).user
      ?.lokacija;
    const loc = p.lokacija || userLoc || "";
    return loc.toLowerCase().trim() === wantCity;
  });
}

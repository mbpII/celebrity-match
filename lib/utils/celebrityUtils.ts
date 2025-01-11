import { Celebrity } from "lib/hooks/useCelebrities";

export function getSimilarNames(
  currentName: string,
  celebrities: Celebrity[],
): string[] {
  const currentCeleb = celebrities.find(
    (celeb) => celeb.name.toLowerCase() === currentName.toLowerCase(),
  );
  if (currentCeleb) {
    if (currentCeleb.gender.toLowerCase() === "male") {
      return celebrities
        .filter(
          (celeb) =>
            celeb.name.toLowerCase() !== currentName.toLowerCase() &&
            celeb.gender.toLowerCase() === "male",
        )
        .map((celeb) => celeb.name)
        .sort(() => Math.random() - 0.5);
    } else {
      return celebrities
        .filter(
          (celeb) =>
            celeb.name.toLowerCase() !== currentName.toLowerCase() &&
            celeb.gender.toLowerCase() === "female",
        )
        .map((celeb) => celeb.name)
        .sort(() => Math.random() - 0.5);
    }
  }
  return [];
}

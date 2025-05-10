import { useCelebrities as Celebrity } from "@/lib/hooks/useCelebrities";
enum Gender {
  Male = "male",
  Female = "female",
  NonBinary = "non-binary",
  Transgender = "transgender",
  Genderqueer = "genderqueer",
  Agender = "agender",
  Pangender = "pangender",
  Genderfluid = "genderfluid",
  TwoSpirit = "two-spirit",
  Intersex = "intersex",
  Neutrois = "neutrois",
  Bigender = "bigender",
  Trigender = "trigender",
  Polygender = "polygender",
}
interface Celebrity {
  name: string;
  gender: Gender;
}

export function getSimilarNames(
  currentName: string,
  celebrities: Celebrity[]
): string[] {
  const currentCeleb = celebrities.find(
    (celeb) => celeb.name.toLowerCase() === currentName.toLowerCase()
  );
  const genders = new Map<Gender, string[]>();
  Object.values(Gender).forEach((gender) => genders.set(gender, []));
  celebrities.forEach((celeb) => genders.get(celeb.gender)?.push(celeb.name));

  const currentCelebGender = currentCeleb?.gender;
  if (currentCelebGender && genders.has(currentCelebGender)) {
    return genders
      .get(currentCelebGender)!
      .filter((name) => name.toLowerCase() !== currentName.toLowerCase())
      .sort(() => Math.random() - 0.5);
  }
  return [];
}

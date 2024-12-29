"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface Celebrity {
  name: string;
  gender: string;
  image: string;
  roleClue: string;
}
function getSimilarNames(
  currentName: string,
  celebrities: Celebrity[]
): string[] {
  const currentCeleb = celebrities.find(
    (celeb) => celeb.name.toLowerCase() === currentName.toLowerCase()
  );
  if (currentCeleb) {
    if (currentCeleb.gender.toLowerCase() === "male") {
      return celebrities
        .filter(
          (celeb) =>
            celeb.name.toLowerCase() !== currentName.toLowerCase() &&
            celeb.gender.toLowerCase() === "male"
        )
        .map((celeb) => celeb.name)
        .sort(() => Math.random() - 0.5);
    } else {
      return celebrities
        .filter(
          (celeb) =>
            celeb.name.toLowerCase() !== currentName.toLowerCase() &&
            celeb.gender.toLowerCase() === "female"
        )
        .map((celeb) => celeb.name)
        .sort(() => Math.random() - 0.5);
    }
  }
  return [];
}

export default function Home() {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchCelebrities = async () => {
      try {
        const response = await fetch("/api/celebrities");
        if (!response.ok) {
          throw new Error("Failed to fetch celebrities");
        }
        const data = await response.json();
        setCelebrities(data);
      } catch (error) {
        console.error("Error fetching celebrities:", error);
        setFeedback("Error loading celebrities. Please try again later.");
      }
    };
    fetchCelebrities();
  }, []);

  const handleGuess = (guess: string) => {
    const correctName = celebrities[currentIndex]?.name.toLowerCase();
    if (guess.toLowerCase() === correctName) {
      setScore(score + 1);
      setIsCorrect(true);
      setFeedback("Correct!");
      setTimeout(() => {
        handleSkip();
        setIsCorrect(false);
      }, 150);
    } else {
      setIsCorrect(false);
      setFeedback("Incorrect. Try again or skip.");
    }
  };

  const handleSkip = () => {
    setFeedback("");
    setGuess("");
    setCurrentIndex((currentIndex + 1) % celebrities.length);
  };
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl front-bold mb-4">Celebrity Match</h1>
      {celebrities.length > 0 && (
        <>
          <div className="w-[300px] mx-auto">
            <Image
              src={celebrities[currentIndex]?.image}
              alt={celebrities[currentIndex]?.name}
              width={300}
              height={300}
              className="rounded-lg"
              priority
              onLoadingComplete={() => setIsLoading(false)}
            />
          </div>
          <p>{celebrities[currentIndex]?.roleClue}</p>
          <div className="flex flex-col space-y-4">
            {celebrities[currentIndex]?.name && (
              <div className="flex space-x-4">
                {[
                  celebrities[currentIndex]?.name,
                  ...getSimilarNames(
                    celebrities[currentIndex]?.name,
                    celebrities
                  ).slice(0, 2),
                ]
                  .sort(() => Math.random() - 0.5)
                  .map((name) => (
                    <button
                      key={name}
                      onClick={() => {
                        setGuess(name.toLowerCase());
                        handleGuess(name);
                      }}
                      className={`px-4 py-2 rounded-md ${
                        isCorrect && guess.toLowerCase() === name.toLowerCase()
                          ? "bg-green-500"
                          : "bg-blue-500"
                      } text-white`}
                    >
                      {name}
                    </button>
                  ))}
              </div>
            )}
          </div>
          <button
            onClick={handleSkip}
            className="bg-blue-500 text-white px-4 py-2 ml-2"
          >
            Skip
          </button>
          {feedback && <p className="mt-4">{feedback}</p>}
        </>
      )}
    </div>
  );
}

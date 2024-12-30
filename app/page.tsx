"use client";

import Image from "next/image";
import { useState } from "react";
import { useCelebrities } from "@/lib/hooks/useCelebrities";
import { getSimilarNames } from "@/lib/utils/celebrityUtils";

export default function Home() {
  const { celebrities, currentIndex, isLoading, setIsLoading, handleSkip } =
    useCelebrities();
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedback, setFeedback] = useState("");

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
              onLoad={() => setIsLoading(false)}
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

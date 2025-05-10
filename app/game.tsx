"use client";

import { useState } from "react";
import { useCelebrities } from "@/lib/hooks/useCelebrities";
import { getSimilarNames } from "@/lib/utils/celebrityUtils";
import { Gender } from "@/lib/utils/enums";

interface Celebrity {
    name: string;
    image: string;
    roleClue: string;
    gender: Gender;
}

export const useGame = () => {
    const { celebrities, currentIndex, setIsLoading, handleSkip } =
        useCelebrities();
    const [guess] = useState("");
    const [score, setScore] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);
    const [feedback, setFeedback] = useState("");

    const handleGuess = (guessedName: string) => {
        const currentCelebrity = celebrities[currentIndex];
        if (!currentCelebrity) return;

        const correctName = currentCelebrity.name.toLowerCase();
        if (guessedName.toLowerCase() === correctName) {
            setScore(score + 1);
            setIsCorrect(true);
            setFeedback("Correct!");
            setTimeout(() => {
                handleSkip();
                setIsCorrect(false);
                setFeedback("");
            }, 150);
        } else {
            setIsCorrect(false);
            setFeedback("Incorrect. Try again or skip.");
        }
    };

    const currentCelebrity = celebrities[currentIndex];
    const similarNames = currentCelebrity
        ? [
            currentCelebrity.name,
            ...getSimilarNames(
                currentCelebrity.name,
                celebrities as Celebrity[]
            ).slice(0, 2),
        ].sort(() => Math.random() - 0.5)
        : [];

    return {
        currentCelebrity,
        score,
        isCorrect,
        guess,
        feedback,
        similarNames,
        setIsLoading,
        handleSkip,
        handleGuess,
    };
};

"use client";

import { CelebrityImage } from "./components/CelebrityImage";
import { NameButtons } from "./components/NameButtons";
import { SkipButton } from "./components/SkipButton";
import { useGame } from "./game";

export default function Home() {
  const {
    currentCelebrity,
    score,
    isCorrect,
    guess,
    feedback,
    similarNames,
    setIsLoading,
    handleSkip,
    handleGuess,
  } = useGame();

  if (!currentCelebrity) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl front-bold mb-4">Celebrity Match</h1>
      <CelebrityImage
        image={currentCelebrity.image}
        name={currentCelebrity.name}
        onLoad={() => setIsLoading(false)}
      />
      <p>{currentCelebrity.roleClue}</p>
      <div className="flex flex-col space-y-4">
        <NameButtons
          names={similarNames}
          isCorrect={isCorrect}
          guess={guess}
          onButtonClick={(name) => {
            handleGuess(name);
          }}
        />
      </div>
      <SkipButton onClick={handleSkip} />
      {feedback && <p className="mt-4">{feedback}</p>}
    </div>
  );
}

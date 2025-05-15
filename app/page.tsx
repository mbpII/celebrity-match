"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./components/Card";
import { CelebrityImage } from "./components/CelebrityImage";
import { NameButtons } from "./components/NameButtons";
import { SkipButton } from "./components/SkipButton";
import { useGame } from "./game";

export default function Home() {
  const {
    currentCelebrity,
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
    <Card className="max-w-4xl w-bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl overflow-hidden">
      <CardHeader>
        <CardTitle>Celebrity Match</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-w-xl mx-auto">
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
        </div>
      </CardContent>
      <CardFooter>
        <SkipButton onClick={handleSkip} />
        {feedback && <p className="ml-auto">{feedback}</p>}
      </CardFooter>
    </Card>
  );
}

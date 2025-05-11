import { useState, useEffect } from "react";

export interface Celebrity {
  name: string;
  gender: string;
  image: string;
  roleClue: string;
}

const getRandomizedOrder = (length: number, excludeIndex?: number) => {
  const indices = Array.from({ length }, (_, i) => i);
  if (excludeIndex !== undefined) {
    indices.splice(excludeIndex, 1);
  }
  const shuffled = indices
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return shuffled;
};

const getNextUniqueIndex = (celebs: Celebrity[], currentIndex: number, availableIndices: number[]) => {
  const nextIndex = getRandomizedOrder(availableIndices.length)[0];
  const remainingIndices = availableIndices.filter(i => i !== nextIndex);

  return {
    nextIndex,
    remainingIndices: remainingIndices.slice(1)
  };
};

export function useCelebrities() {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [order, setOrder] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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

        const initialIndex = Math.floor(Math.random() * data.length);
        setCurrentIndex(initialIndex);
        setOrder(getRandomizedOrder(data.length, initialIndex));

      } catch (error) {
        console.error("Error fetching celebrities:", error);
        throw error;
      }
    };
    fetchCelebrities();
  }, []);

  const handleSkip = () => {
    const result = order.length > 0
      ? getNextUniqueIndex(celebrities, currentIndex, order)
      : getNextUniqueIndex(celebrities, currentIndex, getRandomizedOrder(celebrities.length, currentIndex));
    
    if (!result) return;
    
    setCurrentIndex(result.nextIndex);
    setOrder(result.remainingIndices);
  };

  return {
    celebrities,
    currentIndex,
    isLoading,
    setIsLoading,
    handleSkip,
  };
}
export default Celebrity;

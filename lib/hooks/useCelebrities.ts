import { useState, useEffect } from "react";

export interface Celebrity {
  name: string;
  gender: string;
  image: string;
  roleClue: string;
}

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

        const indices = Array.from({ length: data.length }, (_, i) => i)
          .filter((i) => i !== initialIndex)
          .sort(() => Math.random() - 0.5);
        setOrder(indices);
      } catch (error) {
        console.error("Error fetching celebrities:", error);
        throw error;
      }
    };
    fetchCelebrities();
  }, []);

  const handleSkip = () => {
    if (order.length > 0) {
      let nextIndex = order[0];

      while (celebrities[nextIndex]?.name === celebrities[currentIndex]?.name) {
        const shuffledOrder = [...order].sort(() => Math.random() - 0.5);
        nextIndex = shuffledOrder[0];
        setOrder(shuffledOrder);
      }

      setOrder(order.slice(1));
      setCurrentIndex(nextIndex);
    } else {
      setCurrentIndex((currentIndex + 1) % celebrities.length);

      const newOrder = Array.from({ length: celebrities.length }, (_, i) => i)
        .filter((i) => i !== currentIndex)
        .sort(() => Math.random() - 0.5);

      if (celebrities[newOrder[0]]?.name === celebrities[currentIndex]?.name) {
        [newOrder[0], newOrder[1]] = [newOrder[1], newOrder[0]];
      }

      setCurrentIndex(newOrder[0]);
      setOrder(newOrder.slice(1));
    }
  };

  return {
    celebrities,
    currentIndex,
    isLoading,
    setIsLoading,
    handleSkip,
  };
}

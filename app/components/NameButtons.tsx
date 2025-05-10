interface NameButtonsProps {
  names: string[];
  isCorrect: boolean;
  guess: string;
  onButtonClick: (name: string) => void;
}

export const NameButtons: React.FC<NameButtonsProps> = ({
  names,
  isCorrect,
  guess,
  onButtonClick
}) => (
  <div className="flex space-x-4">
    {names.map((name) => (
      <button
        key={name}
        onClick={() => onButtonClick(name)}
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
);

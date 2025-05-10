interface SkipButtonProps {
  onClick: () => void;
}

export const SkipButton: React.FC<SkipButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-blue-500 text-white px-4 py-2 ml-2"
  >
    Skip
  </button>
);

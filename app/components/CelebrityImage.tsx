import Image from "next/image";

interface CelebrityImageProps {
  image: string;
  name: string;
  onLoad: () => void;
}

export const CelebrityImage: React.FC<CelebrityImageProps> = ({
  image,
  name,
  onLoad
}) => (
  <div className="w-full mx-auto shadow-lg rounded-lg">
    <Image
      src={image || "/placeholder.svg"}
      alt={name || "Game image"}
      width={400}
      height={400}
      className="w-full h-auto object-cover"
      priority
      onLoad={onLoad}
    />
  </div>
);

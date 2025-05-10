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
  <div className="w-[300px] mx-auto">
    <Image
      src={image}
      alt={name}
      width={300}
      height={300}
      className="rounded-lg"
      priority
      onLoad={onLoad}
    />
  </div>
);

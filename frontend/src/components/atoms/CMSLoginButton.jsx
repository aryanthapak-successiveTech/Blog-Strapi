import { BASE_URL } from "@/utils/Constants";
import Image from "next/image";

export default function Button({ logoUrl, buttonText,onClick,className}) {
  return (
    <button
      onClick={onClick}
      className={className}
    >
      {logoUrl && (
        <Image
          src={`${BASE_URL}${logoUrl}`} 
          alt={buttonText}
          width={20}
          height={20}
        />
      )}
      <span>{buttonText}</span>
    </button>
  );
}
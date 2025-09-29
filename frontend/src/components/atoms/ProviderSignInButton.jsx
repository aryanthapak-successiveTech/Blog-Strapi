import { BASE_URL } from "@/utils/Constants";
import Link from "next/link";
import Image from "next/image";

export default function ProviderLoginButton({ logoUrl, loginUrl, buttonText }) {
  return (
    <Link
      href={`${BASE_URL}${loginUrl}`}
      className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition"
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
    </Link>
  );
}

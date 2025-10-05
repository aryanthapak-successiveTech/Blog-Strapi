"use client";

import Link from "next/link";
import Button from "./atoms/CMSLoginButton";
import { useSession, signIn, signOut } from "next-auth/react";
import { BASE_URL } from "@/utils/Constants";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NavbarClient({ siteSettings }) {
  const { data: session } = useSession();

  const siteTitle = siteSettings?.siteTitle || "MyBlog";
  const logoUrl = siteSettings?.logo?.url;
  const navigation = siteSettings?.navigation || [];
  const loginNav = siteSettings?.authNavigation || [];
  const logoutHandler = async () => {
    await signOut({ callbackUrl: "/" });
  };
  return (
    <nav className="bg-white shadow px-6 py-4 gap-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        {logoUrl && (
          <Image
            height={32}
            width={39}
            src={`${BASE_URL}${logoUrl}`}
            alt={siteTitle}
            className="h-8 w-auto"
          />
        )}
        <span className="text-xl font-bold text-blue-600">
          <Link href="/">{siteTitle}</Link>
        </span>
      </div>

      <ul className="flex gap-6 items-center text-gray-700">
        {session &&
          navigation.map((link) => (
            <li key={link.label}>
              <Link href={link.route} className="hover:text-blue-500">
                {link.label}
              </Link>
            </li>
          ))}
      </ul>

      <div className="flex gap-4 ml-auto">
        {!session &&
          loginNav.map((authNav) => (
            <Button
              key={authNav.id}
              buttonText={authNav.buttonText}
              onClick={() => signIn("github")}
              logoUrl={authNav.buttonLogo?.url}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition"
            />
          ))}

        {session && (
          <Button
            buttonText="Logout"
            onClick={logoutHandler}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
          />
        )}
      </div>
    </nav>
  );
}

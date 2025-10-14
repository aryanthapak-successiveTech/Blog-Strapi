"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "./atoms/CMSLoginButton";
import { useSession, signIn, signOut } from "next-auth/react";
import { BASE_URL } from "@/utils/Constants";
import Image from "next/image";

export default function NavbarClient({ siteSettings }) {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const siteTitle = siteSettings?.siteTitle || "MyBlog";
  const logoUrl = siteSettings?.logo?.url;
  const navigation = siteSettings?.navigation || [];
  const loginNav = siteSettings?.authNavigation || [];

  const logoutHandler = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="bg-white shadow px-4 sm:px-6 py-4">
      <div className="flex justify-between items-center">

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

        <ul className="hidden md:flex gap-6 items-center text-gray-700">
          {session &&
            navigation.map((link) => (
              <li key={link.label}>
                <Link href={link.route} className="hover:text-blue-500">
                  {link.label}
                </Link>
              </li>
            ))}
        </ul>

        <div className="hidden md:flex gap-4 items-center">
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

        <button
          name="closed-navigation"
          className="md:hidden flex items-center text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col gap-4">
            {session &&
              navigation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.route}
                    className="block px-4 py-2 hover:bg-gray-100 rounded"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>

          <div className="flex flex-col gap-4 mt-4 px-4">
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
        </div>
      )}
    </nav>
  );
}

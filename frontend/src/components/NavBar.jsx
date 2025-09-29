"use client";

import { useSettings } from "@/hooks/useSettings";
import { BASE_URL } from "@/utils/Constants";
import Link from "next/link";
import ProviderLoginButton from "./atoms/ProviderSignInButton";
import { useAuth } from "@/context/AuthContext";
export default function Navbar() {
  const { siteSettings, loading, error } = useSettings();
  const {token,logout}=useAuth();
  if (loading) {
    return <nav className="p-4">Loading...</nav>;
  }

  if (error) {
    return <nav className="p-4">Error loading site settings</nav>;
  }

  const siteTitle = siteSettings?.siteTitle || "MyBlog";
  const logoUrl = siteSettings?.logo?.url;
  const navigation = siteSettings?.navigation || [];
  const loginNav = siteSettings?.authNavigation || [];
  return (
    <nav className="bg-white shadow px-6 py-4 gap-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        {logoUrl && (
          <img
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
        {token && navigation.map((link) => (
          <li key={link.label}>
            <Link href={link.route} className="hover:text-blue-500">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex gap-4 ml-auto">
        {!token && loginNav.length &&
          loginNav.map((authNav) => (
            <ProviderLoginButton key={authNav.id}
              buttonText={authNav.buttonText}
              loginUrl={authNav.buttonRoute}
              logoUrl={authNav.buttonLogo?.url}
            />
          ))}
          {
            token && <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition">Logout</button>
          }
      </div>
    </nav>
  );
}

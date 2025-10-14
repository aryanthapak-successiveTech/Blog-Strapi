"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window.gtag === "function") {
        window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
          page_path: pathname,
        });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <script
        id="ga-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

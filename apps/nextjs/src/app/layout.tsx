import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { cn } from "@acme/ui";
import { ThemeProvider } from "@acme/ui/theme";
import { Toaster } from "@acme/ui/toast";

import "~/app/styles.css";

import { ConvexProvider } from "~/components/convex-provider";

export const metadata: Metadata = {
  title: "triviaboxd",
  description: "triviaboxd",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "text-foreground bg-white font-sans antialiased",
          inter.variable,
        )}
      >
        <ConvexProvider>
          <ThemeProvider>
            {props.children}
            <Toaster />
          </ThemeProvider>
        </ConvexProvider>
      </body>
    </html>
  );
}

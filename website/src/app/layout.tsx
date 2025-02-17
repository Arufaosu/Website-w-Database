// layout.tsx
import "testwebsite/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import "@/styles/globals.css";
import { TRPCReactProvider } from "testwebsite/trpc/react";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";  // Added Clerk imports

export const metadata: Metadata = {
  title: "HR Administration",
  description: "A modern website built with the T3 stack.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <TRPCReactProvider>
            <header className="bg-gray-900 text-white p-4">
              <nav className="container mx-auto flex justify-between">
                <h1 className="text-2xl font-bold">HR Administration</h1>
                <div>
                  <SignedOut>
                    <SignInButton />  {/* Button for users not signed in */}
                  </SignedOut>
                  <SignedIn>
                    <UserButton />  {/* Button for signed-in users */}
                  </SignedIn>
                </div>
              </nav>
            </header>

            <main>{children}</main>

            <footer className="bg-gray-800 text-white text-center py-4">
              © 2024 HR Administration. All Rights Reserved.
            </footer>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

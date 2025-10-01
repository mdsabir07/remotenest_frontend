import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";
import AuthProvider from "@/components/AuthProvider";
import Script from "next/script";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper"; // ✅ NEW

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RemoteNest",
  description: "Your remote city explorer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Initialize theme before hydration */}
        <Script id="init-theme" strategy="beforeInteractive">
          {`(function() {
              try {
                var t = localStorage.getItem('theme');
                if (t) document.documentElement.classList.add(t);
              } catch (e) {}
          })();`}
        </Script>

        <ThemeProvider>
          <AuthProvider>
            <ClientLayoutWrapper>
              {children}
            </ClientLayoutWrapper>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
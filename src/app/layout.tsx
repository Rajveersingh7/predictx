// Route: Root Layout
import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PredictX - AI Football Predictions",
  description:
    "AI-powered football match outcome predictions using cutting-edge AI technology",
  keywords: ["football", "predictions", "AI", "sports", "betting", "analysis"]
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white min-h-screen antialiased">
        {/* Luxury Background Pattern */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-gold-900/10 via-black to-black pointer-events-none" />
        <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAxLjVjLTIuNDg1IDAtNC41IDIuMDE1LTQuNSA0LjVzMi4wMTUgNC41IDQuNSA0LjUgNC41LTIuMDE1IDQuNS00LjUtMi4wMTUtNC41LTQuNS00LjV6IiBmaWxsPSJyZ2JhKDIxMiwxNzUsNTUsMC4wNSkiLz48L2c+PC9zdmc+')] opacity-30 pointer-events-none" />

        {/* Main Content */}
        <main className="relative container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 max-w-7xl min-h-screen flex items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}

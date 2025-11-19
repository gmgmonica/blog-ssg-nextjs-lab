import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The blog",
  description: "Blog com Next.js",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="pt-BR">
       <body className="qualquer">
        <header>
          <h1>Header</h1>
        </header>

        {children}

        <footer>
          <h1>Footer</h1>
        </footer>
      </body>
    </html>
  );
}

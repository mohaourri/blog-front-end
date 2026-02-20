import "./globals.css";
import Providers from "@/components/layout/Providers";
import KeycloakProvider from "@/components/layout/KeycloakProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          <KeycloakProvider>
            <Navbar />
            <main className="container mx-auto px-6 py-8">{children}</main>
            <Footer />
          </KeycloakProvider>
        </Providers>
      </body>
    </html>
  );
}
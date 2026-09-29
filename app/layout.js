import "./globals.css";

export const metadata = {
  title: "Nikah of Ammad & Aiza",
  description:
    "With the blessings of Allah, you are invited to the Nikah of Ammad Arif and Aiza Farooq.",
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#060a1c",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="locked">{children}</body>
    </html>
  );
}

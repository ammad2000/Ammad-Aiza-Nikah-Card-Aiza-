import BrideWeddingCard from "../../BrideWeddingCard";

export const metadata = {
  title: "Wedding of Aiman & Anas",
  description:
    "Mr. & Mrs. Farrukh Mehmood request the honour of your presence at the wedding of their beloved daughter Aiman Farrukh with Anas Hussain.",
  icons: {
    icon: [{ url: "/baraat/icon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/baraat/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export default function Page() {
  return <BrideWeddingCard />;
}

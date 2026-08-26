import BaraatCard from "../BaraatCard";

// Without this the route inherits the root layout's "Walima of Anas & Aiman".
export const metadata = {
  title: "Baraat of Anas & Aiman",
  description:
    "By the grace of Allah, you are invited to join our baraat and celebrate the wedding of Anas Hussain and Aiman Farrukh.",
  icons: {
    icon: [{ url: "/baraat/icon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/baraat/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export default function Page() {
  return <BaraatCard />;
}

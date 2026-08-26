/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // beforeFiles: "/" already matches a page, so an afterFiles rewrite would never run.
    return {
      beforeFiles: [
        {
          // The Walima link guests receive serves the ember card at its root.
          // Any other host (including the Baraat domain) keeps the original "/" card,
          // and every named route (/ember, /palace, /bloom, /envelope) is untouched.
          source: "/",
          has: [{ type: "host", value: "anas-aiman-walima.vercel.app" }],
          destination: "/ember",
        },
        {
          // The Baraat link serves the baraat card at its root.
          source: "/",
          has: [{ type: "host", value: "anas-aiman-baraat.vercel.app" }],
          destination: "/baraat",
        },
        {
          // Bride's side — her family's own invitations, separate from the Hussain cards.
          source: "/",
          has: [{ type: "host", value: "aiman-anas-baraat.vercel.app" }],
          destination: "/bride/wedding",
        },
        {
          // the original name, kept alive so anything already forwarded still works
          source: "/",
          has: [{ type: "host", value: "aiman-anas-wedding.vercel.app" }],
          destination: "/bride/wedding",
        },
        {
          source: "/",
          has: [{ type: "host", value: "aiman-anas-walima.vercel.app" }],
          destination: "/bride/walima",
        },
      ],
    };
  },
};

export default nextConfig;

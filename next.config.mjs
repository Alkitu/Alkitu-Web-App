/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { hostname: "localhost" },
      { hostname: "images.unsplash.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "drive.google.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value:
              "https://www.insidehair.es, https://insidehair.es, http://www.insidehair.es, http://insidehair.es",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

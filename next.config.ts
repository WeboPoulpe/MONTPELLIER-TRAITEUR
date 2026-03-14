import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/notre-concept-rse",
        destination: "/a-propos#engagement",
        permanent: true,
      },
      {
        source: "/notre-concept-rse/",
        destination: "/a-propos#engagement",
        permanent: true,
      },
      {
        source: "/evenements-professionnels-foires-et-salons",
        destination: "/foires-salons",
        permanent: true,
      },
      {
        source: "/evenements-professionnels-foires-et-salons/",
        destination: "/foires-salons",
        permanent: true,
      },
      {
        source: "/devis/",
        destination: "/devis",
        permanent: true,
      },
      {
        source: "/avis-clients",
        destination: "/",
        permanent: true,
      },
      {
        source: "/avis-clients/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/evenements-prives/",
        destination: "/evenements-prives",
        permanent: true,
      },
      {
        source: "/galerie/",
        destination: "/galerie",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

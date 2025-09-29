import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://t4.ftcdn.net/jpg/05/73/58/91/360_F_573589164_G0Q2w9QdjIkwUUoaY6nfx05tnrLDbyjS.jpg"
      ),
    ],
  },
};

export default nextConfig;

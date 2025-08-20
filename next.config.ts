import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination: "/:path*",
  //       has: [
  //         {
  //           type: "host",
  //           value: "(?<subdomain>.*)\\\\.genstore\\\\.local",
  //         },
  //       ],
  //     },
  //   ];
  // },
  allowedDevOrigins: ["http://localhost:3000", "*.genstore.local:3000"],
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default withPayload(nextConfig);

import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so a stray lockfile above the repo is ignored.
  turbopack: { root: path.resolve(import.meta.dirname) },
};

export default nextConfig;

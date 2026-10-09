/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site: exported to `out/` and served by Cloudflare static assets.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;

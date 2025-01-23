/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["via.placeholder.com"],
    remotePatterns: [
      // HTTPS domains
      ...["lh3.googleusercontent.com", "czcbonajmenirmxdslhj.supabase.co"].map((hostname) => ({
        protocol: "https",
        hostname,
        pathname: hostname === "czcbonajmenirmxdslhj.supabase.co" ? "/**" : undefined
      })),

      // HTTP domains
      ...["img1.kakaocdn.net", "k.kakaocdn.net"].map((hostname) => ({
        protocol: "http",
        hostname
      }))
    ]
  }
};

export default nextConfig;

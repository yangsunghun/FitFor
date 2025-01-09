/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["plus.unsplash.com", "images.unsplash.com"], // 테스트 데이터 외부 이미지 도메인
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      },
      {
        protocol: "http",
        hostname: "img1.kakaocdn.net"
      }
    ]
  }
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "plus.unsplash.com",
      "images.unsplash.com",
      "via.placeholder.com"
    ], // 테스트 데이터 외부 이미지 도메인
    remotePatterns: [
      // HTTPS domains
      ...['lh3.googleusercontent.com', 'czcbonajmenirmxdslhj.supabase.co'].map((hostname) => ({
        protocol: 'https',
        hostname,
        pathname: hostname === 'czcbonajmenirmxdslhj.supabase.co' ? '/**' : undefined,
      })),

      // HTTP domains
      ...['img1.kakaocdn.net', 'k.kakaocdn.net'].map((hostname) => ({
        protocol: 'http',
        hostname,
      })),
    ],
  }
};

export default nextConfig;

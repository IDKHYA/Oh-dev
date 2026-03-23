/** @type {import('next').NextConfig} */
const nextConfig = {
    // 보안 헤더 설정
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-XSS-Protection', value: '1; mode=block' },
                ],
            },
        ];
    },
    // 이미지 최적화 (외부 이미지 허용 시 필요)
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'images.unsplash.com' },
        ],
    },
};

export default nextConfig;

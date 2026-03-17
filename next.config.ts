const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'https://zerra-backend-378c.onrender.com';

const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${API_URL}/:path*`,
            },
            {
                source: '/uploads/:path*',
                destination: `${API_URL}/uploads/:path*`,
            },
        ];
    },
};

export default nextConfig;

/** @type {import('next').NextConfig} */

const withPwa = require('next-pwa')({
    dest: 'public'
});

const nextConfig = {
    images: {
        unoptimized: true,
    },
    experimental: {
        serverActions: true
    }
}

module.exports = withPwa(nextConfig);

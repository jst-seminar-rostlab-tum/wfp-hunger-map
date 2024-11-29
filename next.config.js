/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { isServer }) {
      // Add rule to handle SVG imports
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'], 
      });
  
      return config;
    },
    env: {
      NEXT_EMAIL_SERVICE: process.env.NEXT_EMAIL_SERVICE,
    },
  };
  
  module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { isServer }) {
      // Add rule to handle SVG imports
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'], 
      });
      config.resolve.alias.canvas = false;
  
      return config;
    },
  };
  
  module.exports = nextConfig;

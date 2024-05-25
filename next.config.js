/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    productionBrowserSourceMaps: true,
    experimental: {
      forceSwcTransforms: true,
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
      // Important: return the modified config
      config.module.rules.push({
        test: /\.mjs$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      });
      return config;
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**.com",
          port: "",
        },
        {
          protocol: "https",
          hostname: "ittas.by",
          port: "",
        },
        {
          protocol: "https",
          hostname: "staticg.sportskeeda",
          port: "",
        },
        {
          protocol: "https",
          hostname: "preview.redd.it",
          port: "",
        },
        
      ],
      domains: ["utfs.io"],
    },
  };
  
  
  module.exports = nextConfig;
  
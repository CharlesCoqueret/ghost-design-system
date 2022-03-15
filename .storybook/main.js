const path = require('path');

const maxAssetSize = 250 * 1024;

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-postcss'],
  webpackFinal: async (config, { configType }) => {
    // SCSS ALL EXCEPT local
    config.module.rules.push({
      test: /\.module\.scss$/i,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    });

    // SCSS local
    config.module.rules.push({
      test: /\.scss$/i,
      exclude: /\.module\.scss$/i,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    // Chunking
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        minSize: 30 * 1024,
        maxSize: maxAssetSize,
      },
    };

    // Max size
    config.performance = {
      ...config.performance,
      maxAssetSize: maxAssetSize,
      hints: false,
    };

    return config;
  },
};

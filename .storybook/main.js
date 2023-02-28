const path = require('path');

const maxAssetSize = 250 * 1024;

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-storysource',
    '@storybook/addon-interactions',
    '@storybook/addon-postcss',
    '@storybook/addon-a11y',
  ],
  core: {
    builder: 'webpack5',
  },
  framework: '@storybook/react',
  webpackFinal: async (config) => {
    config.module.rules.unshift({
      test: /\.scss$/i,
      resourceQuery: /raw/,
      type: 'asset/source',
    });

    // SCSS ALL EXCEPT local
    config.module.rules.push({
      test: /\.module\.scss$/i,
      resourceQuery: { not: [/raw/] },
      use: ['style-loader', 'css-loader', 'sass-loader'],
    });

    // SCSS local
    config.module.rules.push({
      test: /\.scss$/i,
      exclude: /\.module\.scss$/i,
      resourceQuery: { not: [/raw/] },
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    // Chunking
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
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
  staticDirs: ['../static'],
  managerHead: (head) => `${head}
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-LXDCMHQK8V"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
  
    gtag('config', 'G-LXDCMHQK8V');
  </script>`,
};

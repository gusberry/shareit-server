const babelConfig = {
  presets: [
    [
      'env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: ['transform-object-rest-spread'],
};

require('babel-register')(babelConfig);
require('./boot');

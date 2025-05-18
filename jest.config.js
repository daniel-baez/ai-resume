/** @type {import('jest').Config} */
const baseConfig = {
  transform: {
    '^.+\\.(ts|tsx)$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          '@babel/preset-typescript',
          ['@babel/preset-react', { runtime: 'automatic' }],
        ],
      },
    ],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '@react-pdf/renderer': '<rootDir>/__mocks__/@react-pdf/renderer.js',
    'react-markdown': '<rootDir>/__mocks__/react-markdown.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    '/node_modules/(?!(@react-pdf|react-pdf|react-markdown)/)',
  ],
};

module.exports = {
  ...baseConfig,
  projects: [
    {
      ...baseConfig,
      displayName: 'unit',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/tests/unit/**/*.test.ts?(x)'],
      testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/.next/',
      ],
    },
    {
      ...baseConfig,
      displayName: 'smoke',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/tests/smoke/**/*.test.ts?(x)'],
      testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/.next/',
      ],
    },
  ],
};

/** @type {import('jest').Config} */
const baseConfig = {
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    'react-markdown': '<rootDir>/__mocks__/react-markdown.js',
  },
  setupFiles: ['<rootDir>/tests/polyfills.ts'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  transformIgnorePatterns: [
    '/node_modules/(?!(@react-pdf|react-pdf|react-markdown|yoga-layout|pdfkit|fontkit|unicode-properties|brotli|png-js|@lie|linebreak)/)',
  ],
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', '<rootDir>'],
};

module.exports = {
  ...baseConfig,
  projects: [
    {
      ...baseConfig,
      displayName: 'unit',
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

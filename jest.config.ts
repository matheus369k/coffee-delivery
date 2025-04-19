/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{tsx,ts}'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/src/styles/', 'styles.ts', '/build/', '/dist/'],transformIgnorePatterns: ['/build/', '/dist/'],
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^@pages/(.*)': '<rootDir>/src/pages/$1',
    '^@components/(.*)': '<rootDir>/src/components/$1',
    '^@assets/(.*)': '<rootDir>/src/assets/$1',
    '^@styles/(.*)': '<rootDir>/src/styles/$1',
    '^@lib/(.*)': '<rootDir>/src/lib/$1',
    '^@layout/(.*)': '<rootDir>/src/layout/$1',
    '^@contexts/(.*)': '<rootDir>/src/contexts/$1',
    '^@router/(.*)': '<rootDir>/src/router/$1',
    '^@/(.*)': '<rootDir>/src/$1',
  },
  testEnvironment: 'jsdom',
  rootDir: '.',
  setupFilesAfterEnv: ['<rootDir>/src/jestSetup.ts'],
  preset: '<rootDir>/node_modules/ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': ['ts-jest', {
      useESM: true,
      tsconfig: '<rootDir>/tsconfig.node.json'
    }],
    '^.+\\.(gif|png|gif|jpg|jpeg|svg)?$': "jest-transform-stub"
  },
  verbose: true,
};

export default config;

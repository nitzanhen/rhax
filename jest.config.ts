export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^test-data': '<rootDir>/test/testdata'
  },
  roots: [
    'test'
  ],
  globals: {

    'ts-jest': {
      tsConfig: '<rootDir>/test/tsconfig.json'
    }
  }
};
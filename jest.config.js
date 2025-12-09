/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,ts}"
  ],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "src/enums/*",
    "src/validations/*",
    "src/routes/*",
    "src/swagger/*",
    "src/configs/*"
  ],
  coverageReporters: [
    "json",
    "text",
    "lcov"
  ],
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)",
    "**/tests/**/*.[t]s?(x)",
  ],
  setupFilesAfterEnv: ['./src/jest.setup.ts'],
  moduleNameMapper:{
    '^@controllers/(.*)$' : '<rootDir>/src/controllers/$1',
    '^@externalServices/(.*)$' : '<rootDir>/src/externalServices/$1',
    '^@services/(.*)$' : '<rootDir>/src/services/$1',
    '^@models/(.*)$' : '<rootDir>/src/models/$1',
    '^@configs/(.*)$' : '<rootDir>/src/configs/$1',
    '^@utils/(.*)$' : '<rootDir>/src/utils/$1',
    '^@routes/(.*)$' : '<rootDir>/src/routes/$1',
    '^@middleware/(.*)$' : '<rootDir>/src/middleware/$1',
    '^@validations/(.*)$' : '<rootDir>/src/validations/$1',
    '^@json/(.*)$' : '<rootDir>/src/json/$1',
    '^@interfaces/(.*)$' : '<rootDir>/src/interfaces/$1',
    '^@enums/(.*)$' : '<rootDir>/src/enums/$1',
  },
};
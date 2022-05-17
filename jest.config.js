module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testEnvironment: 'jsdom',
    collectCoverage: true,
    coverageReporters: ['json', 'html'],
    moduleNameMapper: {
        '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    },
    collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.stories.*', '!**/node_modules/**', '!**/vendor/**'],
};

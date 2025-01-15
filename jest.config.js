module.exports = {
    collectCoverage: false,
    collectCoverageFrom: ['src/**/*.{js,jsx, ts, tsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./jest.setup.js'],
    transform: {
        '^.+\\.(t|j)sx?$': '@swc/jest',
    },
}
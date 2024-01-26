module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: '../',
    testMatch: [
        '<rootDir>/tests/**/*.test.ts?(x)'
    ],
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node'
    ]
};
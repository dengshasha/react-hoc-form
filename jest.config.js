module.exports = {
    testURL: 'https://www.trip.com',
    //需要被mock的资源
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': '<rootDir>/config/test/__mocks__/styleMock.js',
        '\\.(gif|ttf|eot|svg)$': '<rootDir>/config/test/__mocks__/fileMock.js'
    },
    setupFiles: [
        '<rootDir>/config/test/setup_file.js' //运行测试前执行的脚本
    ],
    //是否收集测试时的覆盖率信息
    collectCoverage: true,
    testMatch: ['<rootDir>/src/\*\*/\*.test.js'],
    //输出覆盖信息的文件目录
    coverageDirectory: '<rootDir>/config/test/coverage',
    //哪些文件需要收集覆盖率信息
    collectCoverageFrom: ['<rootDir>/src/form/tools/method.js']
}

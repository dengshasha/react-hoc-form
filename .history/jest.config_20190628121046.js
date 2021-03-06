module.exports = {
    testURL: 'https://www.trip.com',
    //需要被mock的资源
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': '<rootDir>/script/test/__mocks__/styleMock.js',
        '\\.(gif|ttf|eot|svg)$': '<rootDir>/script/test/__mocks__/fileMock.js'
    },
    setupFiles: [
        '<rootDir>/script/test/setup_file.js' //运行测试前执行的脚本
    ],
    //是否收集测试时的覆盖率信息
    collectCoverage: true,
    //输出覆盖信息的文件目录
    coverageDirectory: '<rootDir>/script/test/coverage',
    //哪些文件需要收集覆盖率信息
    collectCoverageFrom: ['<rootDir>/client/component/**/baseInput.js', '<rootDir>/client/tools/validate/index.js']
}
